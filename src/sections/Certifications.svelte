<script lang="ts">
	import { certifications } from "$lib/types/certs";

  const COLOR = {
    orange: { text: "text-orange", border: "border-orange" },
    blue: { text: "text-blue", border: "border-blue" },
    purple: { text: "text-purple", border: "border-purple" },
    pink: { text: "text-pink", border: "border-pink" },
  } as const;
</script>


<section id="certifications" class="">
  <span class="font-bold text-orange text-md md:text-lg">certifications <span class="text-xs font-normal text-white/60">({certifications.length})</span></span>
  <br/>
  <br/>
  <div class="max-h-[220px] overflow-y-auto ">
    <ul class="list-none ml-4 flex flex-col space-y-1">
      {#each certifications as cert, i}
      {@const c = COLOR[(Object.keys(COLOR)[i % Object.keys(COLOR).length]) as keyof typeof COLOR]}
        <li class={`border-l-2 ${c.border} pl-4`}>
            <p class="inline">{cert.name}</p>
            <span class={"text-white/50 opacity-50"}>{cert.date}</span>
        </li>
      {/each}
    </ul>
  </div>
  <br/>
</section>