import { json } from "@sveltejs/kit";
import { favoritePodcastProxy } from "$lib/server/spotify";

export async function GET() {
  return json(await favoritePodcastProxy());
}
