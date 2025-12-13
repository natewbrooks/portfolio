import { env } from "$env/dynamic/private";

const API_BASE = "https://api.github.com";

type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  pushed_at: string;
};

async function githubFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(env.GITHUB_TOKEN ? { Authorization: `Bearer ${env.GITHUB_TOKEN}` } : {})
    }
  });

  if (!res.ok) throw new Error(`GitHub API error ${res.status} for ${path}`);
  return res.json() as Promise<T>;
}

export async function getLastWorkedOnRepo(): Promise<GithubRepo | null> {
  const repos = await githubFetch<GithubRepo[]>(
    `/user/${env.GITHUB_USER_ID}/repos?sort=pushed&direction=desc&per_page=1`
  );
  return repos[0] ?? null;
}

export async function getCommitsThisMonth(): Promise<number | null> {
  const username = env.GITHUB_USERNAME;
  const token = env.GITHUB_TOKEN;
  if (!username || !token) return null;

  const now = new Date();
  const from = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0));
  const to = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0));

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables: {
        login: username,
        from: from.toISOString(),
        to: to.toISOString()
      }
    })
  });

  if (!res.ok) throw new Error(`GitHub GraphQL error ${res.status}`);

  const data = await res.json();
  return data?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? null;
}

export async function getCurrentStreakDays(): Promise<number | null> {
  const username = env.GITHUB_USERNAME;
  const token = env.GITHUB_TOKEN;
  if (!username || !token) return null;

  const now = new Date();
  const to = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
  const from = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
  from.setUTCDate(from.getUTCDate() - 120);

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables: {
        login: username,
        from: from.toISOString(),
        to: to.toISOString()
      }
    })
  });

  if (!res.ok) throw new Error(`GitHub GraphQL error ${res.status}`);

  const data = await res.json();
  const weeks = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
  const days = weeks.flatMap((w: any) => w.contributionDays ?? []);

  if (!days.length) return 0;

  const todayStr = now.toISOString().slice(0, 10);
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  let i = days.length - 1;
  while (i >= 0 && days[i]?.date !== todayStr && days[i]?.date !== yesterdayStr) i -= 1;
  if (i < 0) i = days.length - 1;

  if (!days[i] || days[i].contributionCount === 0) return 0;

  let streak = 0;
  for (let j = i; j >= 0; j -= 1) {
    if ((days[j]?.contributionCount ?? 0) > 0) streak += 1;
    else break;
  }

  return streak;
}
