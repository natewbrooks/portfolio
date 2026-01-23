<script lang="ts">
    import type { PageProps } from './$types';
	import Projects from '../sections/Projects.svelte';
	import Work from '../sections/Work.svelte';
	import Certifications from '../sections/Certifications.svelte';
    import { setContext } from 'svelte';
	import About from '../sections/About.svelte';
	import Education from '../sections/Education.svelte';

    let { data }: PageProps = $props(); 
    setContext('spotify-data', data.spotify)
    setContext('github-data', data.github)
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