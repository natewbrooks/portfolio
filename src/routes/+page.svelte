<script lang="ts">
    import type { PageProps } from './$types';
	import Projects from '../sections/Projects.svelte';
	import Header from '../sections/Header.svelte';
	import Work from '../sections/Work.svelte';
	import Certifications from '../sections/Certifications.svelte';
	import { fly, slide } from 'svelte/transition';
    import { setContext } from 'svelte';

    let { data }: PageProps = $props(); 
    setContext('spotify-data', data.spotify)
    setContext('github-data', data.github)
</script>

<Header/>
<br/>
<div class="px-4 lg:px-0">
    <div class="py-2 md:px-0 text-md">
        <Work />
        <br/>
        <Projects />
        <br/>
        <Certifications />
    </div>
</div> 