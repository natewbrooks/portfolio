<script lang="ts">
	import { certifications } from "$lib/types/certs";
</script>


<section id="certifications" class="">
  <span class="font-bold text-orange text-lg">certifications <span class="text-xs font-normal text-white/60">({certifications.length})</span></span>
  <br/>
  <br/>
  <div class="max-h-[220px] overflow-y-auto ">
    <ul class="list-none ml-4 flex flex-col space-y-1">
      {#each certifications as cert}
        <li class="">
            <p class="inline">{cert.name}</p>
            <span class={"text-white/60"}>{cert.date}</span>
        </li>
      {/each}
    </ul>
  </div>
  <br/>
</section>