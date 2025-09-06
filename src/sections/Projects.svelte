<script lang="ts">
  import { projects } from '$lib/types/project'
  import ProjectCarousel from '../modules/ProjectCarousel.svelte';
  import { TechIcons } from '$lib/types/project';

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

  function yearColor(year: number | string) {
    switch (year) {
      case 2025:
        return "text-purple";
      case 2024:
        return "text-pink";
      case 2023:
        return "text-orange";
      default:
        return "text-green";
    }
  }
</script>

<section id="projects">
  <span class="font-bold text-blue ">projects <span class="text-xs font-normal text-white/50">({projects.length})</span></span>
  <br/>
  <br/>
  <div class="max-h-[180px] md:max-h-[190px] overflow-y-auto">
    <ul class="list-none ml-4 flex flex-col space-y-1">
      {#each projects as project}
      <li class="group" id={"project-" + project.name.toLowerCase().replace(/\s+/g, '-')}>
          <span class={"text-sm " + yearColor(project.year)}>{project.year}</span>
          <a href={project.link} target="_blank" 
             onmouseenter={() => {
              setHighlighted(project.name);
              setHoverLink(true);
             }} 
             onmouseleave={() => {
              setHighlighted("");
              setHoverLink(false);
             }}>
            <span class={[isHighlighted(project.name) && yearColor(project.year) + " underline underline-offset-4", "w-fit"]}>
              {project.name.toLowerCase()}
            </span>
          </a>
          <p class="inline text-sm text-white/50">{project.description} 
              <span class={"inline-flex transition-all space-x-2 opacity-50 text-white/50"}>
                {#each project.technologies as technology}
                  <span class="text-xs">{technology}</span>
                {/each}
              </span> 
          </p>
        </li>
      {/each}
    </ul>
  </div>
  <br/>
  <ProjectCarousel bind:this={carouselRef} {projects} {highlighted} {setHighlighted} {yearColor} />
</section>