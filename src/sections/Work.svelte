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
    <ul class="list-none ml-2 md:ml-4 flex-col">
      {#each workExperience as work}
        {@const c = COLOR[work.colorClass as keyof typeof COLOR]}
        <li class={`border-l-2 ${c.border} px-4 py-2`}>
            <div class="w-full flex flex-col xs:flex-row xs:justify-between xs:items-center">
                <span class={`${c.text} whitespace-nowrap font-bold`}>
                  {work.company}
                </span>

                <time class={` ${c.text} whitespace-nowrap text-xs xs:text-sm sm:text-md`}>
                  {work.date.start} → {work.date.end}
                </time>
              </div>
            <p>
                <span class={"text-white "}>{work.title}</span> 
                <br/>
                <span class={"text-white/50"}>{work.description}</span>
            </p>
        </li>
      {/each}
    </ul>
  </div>
</section>