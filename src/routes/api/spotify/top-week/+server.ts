import { json } from "@sveltejs/kit";
import { topTrackWeekBestEffort } from "$lib/server/spotify";

export async function GET() {
  const data = await topTrackWeekBestEffort();
  return json(data, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
