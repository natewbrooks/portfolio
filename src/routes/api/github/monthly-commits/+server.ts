import { json } from "@sveltejs/kit";
import { getCommitsThisMonth } from "$lib/server/github";

export async function GET() {
  const [commitsThisMonth] = await Promise.all([
    getCommitsThisMonth()
  ]);

  return json(
    commitsThisMonth,
    { headers: { "Cache-Control": "public, max-age=300" } }
  );
}
