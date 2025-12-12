import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } from "$env/static/private";

export async function GET({ url }) {
  const code = url.searchParams.get("code");
  if (!code) return new Response("Missing code", { status: 400 });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI
    })
  });

  if (!res.ok) return new Response(`Token exchange failed: ${res.status}`, { status: 500 });

  const data = await res.json();

  return new Response(
    `Copy this into .env:\n\nSPOTIFY_KEY=${data.refresh_token}\n`,
    { headers: { "Content-Type": "text/plain" } }
  );
}
