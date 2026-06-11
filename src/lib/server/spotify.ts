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

const responseCache = new Map<string, { value: any; expiresAt: number }>();
const inflight = new Map<string, Promise<any>>();

/**
 * Serve `fn`'s result from cache within `ttlMs`, deduping concurrent callers so
 * simultaneous requests share one upstream call. On fetch failure (e.g. Spotify 429)
 * falls back to the last cached value so rate limits don't surface as 500s.
 */
async function cached<T>(key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
  const hit = responseCache.get(key);
  if (hit && Date.now() < hit.expiresAt) return hit.value as T;

  const existing = inflight.get(key);
  if (existing) return existing as Promise<T>;

  const promise = (async () => {
    try {
      const value = await fn();
      responseCache.set(key, { value, expiresAt: Date.now() + ttlMs });
      return value;
    } catch (err) {
      if (hit) return hit.value as T;
      throw err;
    } finally {
      inflight.delete(key);
    }
  })();

  inflight.set(key, promise);
  return promise;
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

async function _mostRecentTrack() {
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

/** Cached 20s; serves stale data on Spotify rate limits. */
export function mostRecentTrack() {
  return cached("recent", 20_000, _mostRecentTrack);
}

async function _currentListening() {
  const now = await nowPlaying();

  if (now?.isPlaying) {
    return {
      ...now,
      source: "now-playing" as const
    };
  }

  const recent = await _mostRecentTrack();
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

/** Cached 20s; serves stale data on Spotify rate limits. */
export function currentListening() {
  return cached("current", 20_000, _currentListening);
}

async function _topTrackMonth() {
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

/** Cached 10min; serves stale data on Spotify rate limits. */
export function topTrackMonth() {
  return cached("top-month", 600_000, _topTrackMonth);
}

async function _topTrackWeekBestEffort() {
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

/** Cached 5min; serves stale data on Spotify rate limits. */
export function topTrackWeekBestEffort() {
  return cached("top-week", 300_000, _topTrackWeekBestEffort);
}

async function _favoritePodcastProxy() {
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

/** Cached 30min; serves stale data on Spotify rate limits. */
export function favoritePodcastProxy() {
  return cached("podcast", 1_800_000, _favoritePodcastProxy);
}
