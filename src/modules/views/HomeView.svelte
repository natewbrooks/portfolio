<script lang="ts">
  import { setContext } from "svelte";
  import Projects from '../../sections/Projects.svelte';
  import Work from '../../sections/Work.svelte';
  import Certifications from '../../sections/Certifications.svelte';
  import About from '../../sections/About.svelte';
  import Education from '../../sections/Education.svelte';

  type SpotifyData = {
    listening?: any;
    topWeek?: any;
    podcast?: any;
  };

  type GitHubData = {
    lastCommitRepo?: any;
    commitsThisMonth?: number;
    currentStreak?: number;
  };

  let { spotify, github }: { spotify: SpotifyData; github: GitHubData } = $props();
  
  // Set contexts for child components
  setContext('spotify-data', spotify);
  setContext('github-data', github);
</script>

<br/>
<div class="px-4 lg:px-0">
    <div class="py-2 md:px-0">
        <About/>
        <br/>
        <Work />
        <br/>
        <Projects />
        <br/>
        <Education/>
        <br/>
        <Certifications />
    </div>
</div>
