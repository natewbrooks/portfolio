import fg from "fast-glob";
import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";

const INPUT_DIR = "static/images";
const OUT_DIR = "static/images/optimized";

const PATTERN = ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.webp"];

const MAX_W = 768;
const QUALITY = 80;

await fs.mkdir(OUT_DIR, { recursive: true });

const files = await fg(PATTERN, { cwd: INPUT_DIR, absolute: true });

await Promise.all(
  files.map(async (abs) => {
    const relFromInput = path.relative(INPUT_DIR, abs);
    const baseName = relFromInput.replace(/\.(png|jpe?g|webp)$/i, "");
    const outAbs = path.join(process.cwd(), OUT_DIR, `${baseName}.webp`);

    await fs.mkdir(path.dirname(outAbs), { recursive: true });

    const img = sharp(abs);
    const meta = await img.metadata();
    if (!meta.width) return;

    const shouldResize = meta.width > MAX_W;

    const pipeline = sharp(abs)
      .resize(shouldResize ? { width: MAX_W, withoutEnlargement: true } : undefined)
      .webp({ quality: QUALITY });

    await pipeline.toFile(outAbs);

    console.log(
      `optimized: ${path.relative(process.cwd(), abs)} -> ${path.relative(process.cwd(), outAbs)}${shouldResize ? ` (<=${MAX_W}px)` : ""}`
    );
  })
);