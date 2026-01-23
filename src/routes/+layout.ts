import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
  const [listening, topWeek, podcast, lastCommitRepo, commitsThisMonth, currentStreak] = await Promise.all([
    fetch("/api/spotify/now-playing").then(r => r.json()),
    fetch("/api/spotify/top-week").then(r => r.json()),
    fetch("/api/spotify/podcast").then(r => r.json()),
    fetch("/api/github/last-commit-repo").then(r => r.json()),
    fetch("/api/github/monthly-commits").then(r => r.json()),
    fetch("/api/github/current-streak").then(r => r.json())
  ]);

  return {
    spotify: {
      listening,
      topWeek,
      podcast
    },
    github: {
      lastCommitRepo,
      commitsThisMonth,
      currentStreak
    }
  };
};
