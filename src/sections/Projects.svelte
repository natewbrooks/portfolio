<script lang="ts">
  import { projects, TechIcons} from '$lib/types/project'
  import ProjectCarousel from '../modules/ProjectCarousel.svelte';

  let highlighted = $state("");
  let hoverLink = $state(false);
  let carouselRef: any; // Reference to the carousel component

  function isHighlighted(name: string) {
    return highlighted.toLowerCase() === name.toLowerCase();
  }

  function setHighlighted(name: string) {
    highlighted = name;
  }

  function setHoverLink(toggle: boolean) {
    hoverLink = toggle;
  }

  // Effect to scroll project list when highlighted changes
  $effect(() => {
    if(highlighted != "") {
      const el = document.getElementById(`project-${highlighted}`);
      el?.scrollIntoView({behavior: "smooth", block: "nearest"});
      
      // Also scroll carousel to show highlighted project
      if (carouselRef && hoverLink) {
        carouselRef.scrollToProject(highlighted);
      }
    }
  })

  function yearStyles(year: number | string) {
    switch (year) {
      case 2025: return { text: 'text-purple', border: 'border-purple' };
      case 2024: return { text: 'text-pink',   border: 'border-pink'   };
      case 2023: return { text: 'text-orange', border: 'border-orange' };
      default:   return { text: 'text-green',  border: 'border-green'  };
    }
  }
</script>

<section id="projects">
  <span class="font-bold text-pink text-md md:text-lg">projects <span class="text-xs font-normal text-white/60">({projects.length})</span></span>
  <br/>
  <br/>
  <div class="max-h-[300px] md:max-h-[190px] overflow-y-auto">
    <ul class="list-none ml-4 flex flex-col">
      {#each projects as project}
      {@const c = yearStyles(project.year)}
      <li class={`group border-l-2 pl-4 py-2 ${c.border}`} id={"project-" + project.name.toLowerCase().replace(/\s+/g, '-')}>
          <span class={`${yearStyles(project.year).text} `}>{project.year}</span>
          <a href={project.link} target="_blank" 
             onmouseenter={() => {
              setHighlighted(project.name);
              setHoverLink(true);
             }} 
             onmouseleave={() => {
              setHighlighted("");
              setHoverLink(false);
             }}>
            <span class={[isHighlighted(project.name) &&  `${yearStyles(project.year).text} underline underline-offset-4`, "w-fit"]}>
              {project.name}
            </span>
            <span class={"inline-flex transition-all relative top-1 space-x-2 opacity-50 text-white/50"}>
                {#each project.technologies as technology}
                  {@const Icon = TechIcons[technology]}
                  <Icon class="w-4 h-4"/>
                {/each}
              </span> 
          </a>
          <p class="flex-inline text-white/50">
              <span>{project.description} </span>
          </p>
        </li>
      {/each}
    </ul>
  </div>
  <br/>
  <ProjectCarousel bind:this={carouselRef} {projects} {highlighted} {setHighlighted} {yearStyles} />
</section>