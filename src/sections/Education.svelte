<script lang="ts">
  import { education } from "$lib/types/education";

  const COLOR = {
    orange: { text: "text-orange", border: "border-orange" },
    blue: { text: "text-blue", border: "border-blue" },
    purple: { text: "text-purple", border: "border-purple" },
    pink: { text: "text-pink", border: "border-pink" },
  } as const;
</script>

<section id="school">
  <span class="font-bold text-blue text-md md:text-lg"> education <span class="text-xs font-normal text-white/60">({education.length})</span></span>
  <br />
  <br />

  <div class="max-h-[600px] md:max-h-[320px] overflow-y-auto">
    <ul class="list-none ml-2 md:ml-4 flex-col">
      {#each education as edu, i}
        {@const c = COLOR[(Object.keys(COLOR)[i % Object.keys(COLOR).length]) as keyof typeof COLOR]}
        <li class={`border-l-2 ${c.border} px-4 py-2`}>
          <div class="flex flex-col w-full">
            <div class="flex gap-2 flex-wrap items-center">
              <span class={`${c.text} font-bold`}>{edu.school} • <span class={`${c.text} opacity-60`}>{edu.startDate} — {edu.endDate}</span></span>
            </div>
            <p>
              <span class="text-white">{edu.major}</span>
              <span class="text-white/60">GPA {edu.gpa}</span>
            </p>
            
            <span class="text-white/50">{edu.highlights.join(" · ")}</span>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</section>
