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
  <span class="font-bold text-md md:text-lg text-green">work <span class="text-xs font-normal text-white/60">({workExperience.length})</span></span>
  <br/>
  <br/>
  <div class="max-h-[600px] md:max-h-[320px] overflow-y-auto">
    <ul class="list-none ml-4 flex-col">
      {#each workExperience as work}
        {@const c = COLOR[work.colorClass as keyof typeof COLOR]}
        <li class={`border-l-2 ${c.border} px-4 py-2`}>
            <time class={` ${c.text} opacity-50 whitespace-nowrap text-xs`}>
                {work.date.start} - {work.date.end}
              </time>
            <div class="w-full flex flex-col xs:flex-row xs:justify-between xs:items-center ">
                <span class={`${c.text} whitespace-nowrap`}>
                  {work.company}
                </span>
              </div>
              

            <p>
                <span class={"text-white "}>{work.title}</span> 
                <br/>
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