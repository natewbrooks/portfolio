import { json } from "@sveltejs/kit";
import { currentListening } from "$lib/server/spotify";

export async function GET() {
  const data = await currentListening();
  return json(data, {
    headers: { "Cache-Control": "no-store" }
  });
}
