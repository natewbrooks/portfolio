import { redirect } from "@sveltejs/kit";
import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from "$env/static/private";

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
      client_id: SPOTIFY_CLIENT_ID,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      scope,
      show_dialog: "true"
    });

  throw redirect(302, url);
}
