import fg from "fast-glob";
import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";

const INPUT_DIR = "static/images";
const PATTERN = ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.webp"];
const MAX_W = 768;
const QUALITY = 80;

const files = await fg(PATTERN, { cwd: INPUT_DIR, absolute: true });

await Promise.all(
  files.map(async (abs) => {
    const rel = path.relative(process.cwd(), abs);

    const img = sharp(abs);
    const meta = await img.metadata();

    if (!meta.width) return;

    const shouldResize = meta.width > MAX_W;
    const out = abs.replace(/\.(png|jpe?g|webp)$/i, ".webp");

    const pipeline = sharp(abs)
      .resize(shouldResize ? { width: MAX_W } : null)
      .webp({ quality: QUALITY });

    const buf = await pipeline.toBuffer();
    await fs.writeFile(out, buf);

    if (out !== abs && abs.toLowerCase().endsWith(".webp") === false) {
      await fs.unlink(abs);
    }

    console.log(`optimized: ${rel} -> ${path.relative(process.cwd(), out)}${shouldResize ? ` (<=${MAX_W}px)` : ""}`);
  })
);