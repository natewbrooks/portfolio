<script lang="ts">
	import Projects from '../sections/Projects.svelte';
	import Header from '../sections/Header.svelte';
	import Work from '../sections/Work.svelte';
	import Certifications from '../sections/Certifications.svelte';
	import { fly, slide } from 'svelte/transition';
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