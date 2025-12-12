import { json } from "@sveltejs/kit";
import { nowPlaying } from "$lib/server/spotify";

export async function GET() {
  return json(await nowPlaying());
}
