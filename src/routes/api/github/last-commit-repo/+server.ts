import { json } from "@sveltejs/kit";
import { getLastWorkedOnRepo } from "$lib/server/github";

export async function GET() {
  return json(await getLastWorkedOnRepo());
}
