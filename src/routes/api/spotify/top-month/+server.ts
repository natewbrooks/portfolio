import { json } from "@sveltejs/kit";
import { topTrackMonth } from "$lib/server/spotify";

export async function GET() {
  return json(await topTrackMonth());
}
