<script lang="ts">
    import { workExperience } from "$lib/types/work";

    const COLOR = {
      purple: { text: "text-purple", border: "border-purple" },
      pink: { text: "text-pink", border: "border-pink" },
      orange: { text: "text-orange", border: "border-orange" },
      blue: { text: "text-blue", border: "border-blue" }
    } as const;

</script>

<section id="work">
  <span class="font-bold text-lg text-green">work <span class="text-xs font-normal text-white/60">({workExperience.length})</span></span>
  <br/>
  <br/>
  <div class="max-h-[600px] md:max-h-[320px] overflow-y-auto">
    <ul class="list-none ml-4 flex-col">
      {#each workExperience as work}
        {@const c = COLOR[work.colorClass as keyof typeof COLOR]}
        <li class={`border-l-2 ${c.border} px-4 py-2`}>
           <div class="w-full flex">
                {#if work.company} 
                    <div class="flex space-x-2">
                      <span class={c.text}>{work.company}</span>
                      <span class={c.text + " opacity-50"}> | {work.date.start} - {work.date.end}</span>
                    </div>
                {:else}
                    <span class={"text-pink "}> {work.date.start} - {work.date.end}</span>
                {/if}
           </div>

            <p>
                <span class={"text-white "}>{work.title}</span> 
                <span class={"text-white/50"}>{work.description}</span>
            </p>
            
            <!-- <p class="inline text-xs text-white/60">{project.description}</p> -->
            <!-- <div class="flex text-white/60">
                {#each project.technologies as technology}
                <svelte:component this={TechIcons[technology]}/>
                {/each}
            </div> -->
        </li>
      {/each}
    </ul>
  </div>
</section>