import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params })  => {
  const [listening, topWeek, podcast, lastCommitRepo, commitsThisMonth, currentStreak] = await Promise.all([
    fetch("/api/spotify/now-playing").then(r => r.json()),
    fetch("/api/spotify/top-week").then(r => r.json()),
    // fetch("/api/spotify/top-month").then(r => r.json()),
    fetch("/api/spotify/podcast").then(r => r.json()),
    fetch("/api/github/last-commit-repo").then(r => r.json()),
    fetch("/api/github/monthly-commits").then(r => r.json()),
    fetch("/api/github/current-streak").then(r => r.json())
  ]);

  return {
    spotify: {
        listening,
        topWeek,
        // topMonth,
        podcast
    },
    github: {
        lastCommitRepo,
        commitsThisMonth,
        currentStreak
    }
  };
}
