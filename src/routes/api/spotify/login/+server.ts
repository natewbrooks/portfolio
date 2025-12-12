import { redirect } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";


const scope = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-read-recently-played",
  "user-top-read",
  "user-library-read"
].join(" ");

export function GET() {
  const url =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id: env.SPOTIFY_CLIENT_ID,
      redirect_uri: env.SPOTIFY_REDIRECT_URI,
      scope,
      show_dialog: "true"
    });

  throw redirect(302, url);
}
