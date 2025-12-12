import { json } from "@sveltejs/kit";
import { mostRecentTrack } from "$lib/server/spotify";

export async function GET() {
  return json(await mostRecentTrack());
}
