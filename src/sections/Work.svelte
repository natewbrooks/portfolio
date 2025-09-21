<script lang="ts">
    import { workExperience } from "$lib/types/work";
</script>

<section id="work">
  <span class="font-bold text-lg text-pink">work <span class="text-xs font-normal text-white/50">({workExperience.length})</span></span>
  <br/>
  <br/>
  <div class="max-h-[300px] md:max-h-[320px] overflow-y-auto">
    <ul class="list-none ml-4 flex-col space-y-2">
      {#each workExperience as work}
        <li class="">
           <div class="w-full flex text-sm">
                {#if work.role} 
                    <div class="flex space-x-2">
                      <span class={"text-blue"}>{work.role}</span>
                      <span class={"text-white/50 opacity-50"}> {work.date.start} - {work.date.end}</span>
                    </div>
                {:else}
                    <span class={"text-pink "}> {work.date.start} - {work.date.end}</span>
                {/if}
           </div>

            <p>
                <span class={"text-white "}>{work.title}</span> 
                <span class={"text-sm text-white/50"}>{work.description}</span>
            </p>
            
            <!-- <p class="inline text-xs text-white/50">{project.description}</p> -->
            <!-- <div class="flex text-white/50">
                {#each project.technologies as technology}
                <svelte:component this={TechIcons[technology]}/>
                {/each}
            </div> -->
        </li>
      {/each}
    </ul>
  </div>
</section>