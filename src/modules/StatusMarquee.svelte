<script lang="ts">
  import { getContext } from "svelte";
  // import { Marquee } from "@selemondev/svelte-marquee";
  import Marquee from "../utils/Marquee.svelte"
  import type { StatusItem } from "$lib/types/status";

  import IconSpotify from "~icons/mdi/spotify";
  import IconPodcast from "~icons/mdi/microphone-variant";
  import IconTrophy from "~icons/material-symbols/emoji-events";
  import IconRepo from "~icons/mdi/source-repository";
  import IconCommit from "~icons/mdi/source-commit";
  import IconFire from "~icons/mdi/fire";
  import IconBrain from "~icons/mdi/brain";
  import IconGame from "~icons/solar/gamepad-bold";

  type SpotifySummary = {
    listening?: {
      isPlaying: boolean;
      name: string;
      artists: string[];
      source: "now-playing" | "last-played";
    };
    podcast?: any;
    topWeek?: any;
  };

  type GitHubSummary = {
    lastCommitRepo?: any;
    commitsThisMonth?: number;
    currentStreak?: number;
  };

  const spotify = getContext<SpotifySummary>("spotify-data");
  const github = getContext<GitHubSummary>("github-data");

  const statusItems = $derived.by<StatusItem[]>(() => {
    const items: StatusItem[] = [];

    if (spotify?.listening?.name) {
      items.push({
        icon: IconSpotify,
        colorClass: "text-green",
        label: spotify.listening.isPlaying ? "listening to:" : "last played:",
        status: spotify.listening.name,
        subLabel: `- ${spotify.listening.artists.join(", ")}`
      });
    }

    if (spotify?.podcast?.name) {
      items.push({
        icon: IconPodcast,
        colorClass: "text-purple",
        label: "favorite podcast:",
        status: spotify.podcast.name
      });
    }

    if (spotify?.topWeek?.name) {
      items.push({
        icon: IconTrophy,
        colorClass: "text-blue",
        label: "song of the week:",
        status: spotify.topWeek.name,
        subLabel: `- ${spotify.topWeek.artists.join(", ")}`
      });
    }

    if (github?.lastCommitRepo?.name) {
      items.push({
        icon: IconRepo,
        colorClass: "text-pink",
        label: "last public commit repo:",
        status: github.lastCommitRepo.name
      });
    }

    if (github?.commitsThisMonth) {
      items.push({
        icon: IconCommit,
        colorClass: "text-purple",
        label: "commits this month:",
        status: String(github.commitsThisMonth)
      });
    }

    if (github?.currentStreak) {
      items.push({
        icon: IconFire,
        colorClass: "text-orange",
        label: "current commit streak:",
        status: `${github.currentStreak} days`
      });
    }

    items.push(
      {
        icon: IconBrain,
        colorClass: "text-green",
        label: "currently learning:",
        status: "guitar"
      },
      {
        icon: IconGame,
        colorClass: "text-purple",
        label: "favorite game:",
        status: "super smash bros. melee"
      }
    );

    return items;
  });
  
  // Create a stable key based on item count to prevent re-renders mid-animation
  let stableKey = $derived(statusItems.length);
  console.log(statusItems)
</script>

<div class="overflow-hidden w-full relative">
  {#key stableKey}
  <Marquee class="[--duration:10s] [--gap:2rem]" pauseOnHover>
  {#each statusItems as { icon, colorClass, label, status, subLabel }}
    {@const Icon = icon}
    <div class="flex space-x-2 items-center whitespace-nowrap text-sm">
      <Icon class={colorClass}/>
      <p class={colorClass}>
        <span class="">{label.toLowerCase()}</span>
        <span class="text-white">{status.toLowerCase()}</span>
        {#if subLabel}
          <span class={colorClass}>{subLabel.toLowerCase()}</span>
        {/if}
      </p>
    </div>
  {/each}
</Marquee>
  {/key}
<div
    class="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-darkest"
  ></div>
  <div
    class="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-darkest"
  ></div>
</div>