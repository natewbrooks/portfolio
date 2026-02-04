<script lang="ts">
  import { cn } from "$lib/utils";
  
  export let pauseOnHover: boolean = false;
  export let vertical: boolean = false;
  export let reverse: boolean = false;
  let className: any = "";
  export { className as class };
</script>

<div
  class={cn(
    "group flex overflow-hidden [--duration:40s] [--gap:1rem]",
    {
      "flex-row": !vertical,
      "flex-col": vertical,
    },
    className
  )}
>
  <!-- Only 2 copies needed for seamless loop -->
  {#each [0, 1] as i}
    <div
      class={cn(
        "flex shrink-0 items-center",
        "[gap:var(--gap)] [padding-right:var(--gap)]",
        {
          "animate-marquee flex-row": !vertical,
          "animate-marquee-vertical flex-col": vertical,
          "group-hover:[animation-play-state:paused]": pauseOnHover,
          "[animation-direction:reverse]": reverse,
        }
      )}
      aria-hidden={i > 0}
    >
      <slot />
    </div>
  {/each}
</div>