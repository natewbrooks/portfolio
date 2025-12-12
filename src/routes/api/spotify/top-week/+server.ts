import { json } from "@sveltejs/kit";
import { topTrackWeekBestEffort } from "$lib/server/spotify";

export async function GET() {
  return json(await topTrackWeekBestEffort());
}
