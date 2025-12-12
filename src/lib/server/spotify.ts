import { env } from "$env/dynamic/private";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_BASE = "https://api.spotify.com/v1";

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

function basicAuth() {
  return "Basic " + Buffer.from(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`).toString("base64");
}

async function getAccessToken() {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.accessToken;
  if (!env.SPOTIFY_KEY) throw new Error("Missing SPOTIFY_KEY (refresh token)");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: basicAuth(),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: env.SPOTIFY_KEY
    })
  });

  if (!res.ok) throw new Error(`Spotify token refresh failed: ${res.status}`);

  const data = await res.json();

  cachedToken = {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000 - 30_000
  };

  return cachedToken.accessToken;
}

async function spotifyFetch<T>(path: string) {
  const token = await getAccessToken();
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (res.status === 204) return null as T | null;
  if (!res.ok) throw new Error(`Spotify API error ${res.status} for ${path}`);

  return (await res.json()) as T;
}

export async function nowPlaying() {
  const data = await spotifyFetch<any>(`/me/player/currently-playing?additional_types=track,episode`);
  if (!data?.item) return { isPlaying: false as const };

  const item = data.item;
  if (item.type === "episode") {
    return {
      isPlaying: !!data.is_playing,
      type: "episode" as const,
      name: item.name,
      url: item.external_urls?.spotify ?? "",
      showName: item.show?.name,
      image: item.images?.[0]?.url
    };
  }

  return {
    isPlaying: !!data.is_playing,
    type: "track" as const,
    name: item.name,
    url: item.external_urls?.spotify ?? "",
    previewUrl: item.preview_url ?? null,
    artists: (item.artists ?? []).map((a: any) => a.name),
    image: item.album?.images?.[0]?.url
  };
}

export async function mostRecentTrack() {
  const data = await spotifyFetch<any>(`/me/player/recently-played?limit=1`);
  const it = data?.items?.[0];
  if (!it?.track) return null;

  return {
    name: it.track.name,
    artists: (it.track.artists ?? []).map((a: any) => a.name),
    url: it.track.external_urls?.spotify ?? "",
    playedAt: it.played_at,
    image: it.track.album?.images?.[0]?.url
  };
}

export async function currentListening() {
  const now = await nowPlaying();

  if (now?.isPlaying) {
    return {
      ...now,
      source: "now-playing" as const
    };
  }

  const recent = await mostRecentTrack();
  if (!recent) return null;

  return {
    isPlaying: false as const,
    type: "track" as const,
    name: recent.name,
    artists: recent.artists,
    url: recent.url,
    image: recent.image,
    playedAt: recent.playedAt,
    source: "last-played" as const
  };
}

export async function topTrackMonth() {
  const data = await spotifyFetch<any>(`/me/top/tracks?time_range=short_term&limit=1`);
  const t = data?.items?.[0];
  if (!t) return null;

  return {
    name: t.name,
    artists: (t.artists ?? []).map((a: any) => a.name),
    url: t.external_urls?.spotify ?? "",
    image: t.album?.images?.[0]?.url
  };
}

export async function topTrackWeekBestEffort() {
  const after = Date.now() - 7 * 24 * 60 * 60 * 1000;

  const data = await spotifyFetch<any>(
    `/me/player/recently-played?limit=50&after=${after}`
  );

  let items: any[] = data?.items ?? [];
  if (!items.length) return null;

  items = items.filter((it) => {
    const t = Date.parse(it?.played_at ?? "");
    return Number.isFinite(t) && t >= after;
  });

  if (!items.length) return null;

  const counts = new Map<string, { track: any; n: number }>();

  for (const it of items) {
    const tr = it?.track;
    if (!tr?.id) continue;

    const entry = counts.get(tr.id) ?? { track: tr, n: 0 };
    entry.n += 1;
    counts.set(tr.id, entry);
  }

  let best: { track: any; n: number } | null = null;
  for (const v of counts.values()) {
    if (!best || v.n > best.n) best = v;
  }

  if (!best) return null;

  return {
    name: best.track.name,
    artists: (best.track.artists ?? []).map((a: any) => a.name),
    url: best.track.external_urls?.spotify ?? "",
    image: best.track.album?.images?.[0]?.url,
    playsInSample: best.n
  };
}

export async function favoritePodcastProxy() {
  const data = await spotifyFetch<any>(`/me/shows?limit=1`);
  const show = data?.items?.[0]?.show;
  if (!show) return null;

  return {
    name: show.name,
    url: show.external_urls?.spotify ?? "",
    publisher: show.publisher,
    image: show.images?.[0]?.url,
    note: "Spotify does not expose 'most listened podcast' via Web API. This is your first saved show."
  };
}
