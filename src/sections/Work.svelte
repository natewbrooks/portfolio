<script lang="ts">
    import { workExperience } from "$lib/types/work";

    const COLOR = {
      purple: { text: "text-purple", border: "border-purple", bg: "bg-purple" },
      pink: { text: "text-pink", border: "border-pink", bg: "bg-pink" },
      orange: { text: "text-orange", border: "border-orange", bg: "bg-orange" },
      blue: { text: "text-blue", border: "border-blue", bg: "bg-blue" }
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
        <li class={`relative border-l-2 ${c.border} pl-6 pr-4 py-2`}>
          <div class={`${c.text} font-bold mb-1`}>{work.company}</div>
          <ul class={`list-none flex-col ${work.roles[0]?.description ? "space-y-2" : "space-y-1"}`}>
            {#each work.roles as role}
              {@const isCurrent = role.date.end === "Present"}
              <li class="relative">
                <span
                  class={`absolute -left-[29.5px] top-[4px] w-3 h-3 rounded-full border-2 ${c.border} ${isCurrent ? "bg-[#121010]" : c.bg}`}
                  aria-hidden="true"
                ></span>
                <div class="flex flex-col md:flex-row md:items-center md:gap-2">
                  <span class="text-white font-bold">{role.title}</span>
                  <span class={`${c.text} opacity-60 text-sm`}><span class="hidden min-md:inline-block">|</span> {role.date.start} — {role.date.end}</span>
                </div>
                <p class="text-white/50 max-md:mt-1">{role.description}</p>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </div>
</section>
