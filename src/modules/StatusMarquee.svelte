<script lang="ts">
    import { Marquee } from "@selemondev/svelte-marquee";
    // import "@selemondev/svelte-marquee/dist/style.css";

    import { statusItems } from "$lib/types/status";
</script>

<Marquee fade={true} reverse={true} pauseOnHover={true}>
  {#each statusItems as { icon, colorClass, label, status, subLabel }}
    <button class="flex space-x-1 text-sm items-center">
      <svelte:component this={icon} class={colorClass} />
      <p class={colorClass}>
        {label}
        <span class="text-white">{status}</span>
        {#if subLabel}
          <span class="text-xs text-pink">{subLabel}</span>
        {/if}
      </p>
    </button>
  {/each}
</Marquee>


        <!-- <div class="flex space-x-6 w-full">
            {#each Array.from({ length: 15 }, (_, i) => i) as num}
                <div class="aspect-square w-full flex items-center justify-center h-full text-center rounded-sm"><IconGithub class="text-light"/></div>
            {/each}
        </div> -->
        <!-- <p class="text-center text-light">
            technologies scrolling strip
        </p> -->

        <!-- <ul class="list-disc list-inside">
            <li>currently learning: guitar</li>
            <li>currently/last listening to: spotify api song</li>
            <li>currently/not coding</li>
            <li>last movie watched: letterboxd api</li>
            <li>favorite podcast: The Yard (of the week)</li>
            <li>morning in baltimore 🌅</li>
            <li>favorite song: punkrocker (listened to the most in the past week)</li>
        </ul> -->