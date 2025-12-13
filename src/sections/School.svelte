<script lang="ts">
  import { school } from "$lib/types/school";

  const COLOR = {
    blue: { text: "text-blue", border: "border-blue" },
    purple: { text: "text-purple", border: "border-purple" },
    pink: { text: "text-pink", border: "border-pink" },
    orange: { text: "text-orange", border: "border-orange" },
  } as const;
</script>

<section id="school">
  <span class="font-bold text-lg text-blue">
    education <span class="text-xs font-normal text-white/60">({school.length})</span>
  </span>
  <br />
  <br />

  <div class="max-h-[600px] md:max-h-[320px] overflow-y-auto">
    <ul class="list-none ml-4 flex-col">
      {#each school as edu, i}
        {@const c = COLOR[(Object.keys(COLOR)[i % Object.keys(COLOR).length]) as keyof typeof COLOR]}
        <li class={`border-l-2 ${c.border} px-4 py-2`}>
          <div class="flex space-x-2 items-center">
            <img src={edu.img} class="w-10 h-10" alt={edu.school + " image"}/>
            <div class="flex flex-col">
                <div class="w-full flex">
                <div class="flex space-x-2">
                  <span class={c.text}>{edu.school}</span>
                  <span class="text-white/60 opacity-50">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
  
              <p>
                <span class="text-white">{edu.major}</span>
                <span class="text-white/60">GPA {edu.gpa}</span>
              </p>
  
            </div>
            <!-- <ul class="mt-2 list-disc ml-5 text-sm text-white/60">
              {#each edu.highlights as h}
                <li>{h}</li>
              {/each}
            </ul>

          </div> -->

        </li>
      {/each}
    </ul>
  </div>
</section>
