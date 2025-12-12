import { json } from "@sveltejs/kit";
import { getCurrentStreakDays } from "$lib/server/github";

export async function GET() {
  const [currentStreak] = await Promise.all([
    getCurrentStreakDays()
  ]);

  return json(
    currentStreak,
    { headers: { "Cache-Control": "public, max-age=300" } }
  );
}
