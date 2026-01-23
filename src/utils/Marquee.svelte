<script lang="ts">
  import { cn } from "$lib/utils";
  export let pauseOnHover: boolean = false;
  export let vertical: boolean = false;
  export let repeat: number = 6;
  export let reverse: boolean = false;

  let className: any = "";
  export { className as class };
</script>

<div
  class={cn(
    "group flex overflow-hidden [--duration:2s] [--gap:1rem] [gap:var(--gap)]",
    {
      "flex-row": !vertical,
      "flex-col": vertical,
    },
    className
  )}
>
  {#each { length: repeat } as _, i (i)}
    <div
      class={cn("flex shrink-0 justify-around [gap:var(--gap)] will-change-transform", {
        "animate-marquee flex-row": !vertical,
        "animate-marquee-vertical flex-col": vertical,
        "group-hover:[animation-play-state:paused]": pauseOnHover,
        "[animation-direction:reverse]": reverse,
      })}
      aria-hidden={i > 0}
    >
      <slot>Default</slot>
    </div>
  {/each}
</div>
