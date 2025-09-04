<script lang="ts">
	import Projects from '../sections/Projects.svelte';
	import Header from '../sections/Header.svelte';
	import Work from '../sections/Work.svelte';
	import Certifications from '../sections/Certifications.svelte';
	import { fly, slide } from 'svelte/transition';

    let revealAbout = $state(false)

    function toggleAbout() {
        revealAbout = !revealAbout;
    }
</script>

<Header {toggleAbout} />
<br/>
<div class="px-4 lg:px-0">
    <div class="hidden md:block  border-light ">
        {#if revealAbout}
            <p transition:slide={{axis: "y"}} class="  text-xs pb-4 -z-10">Hello! I’m 21 years old and extremely driven.  I love learning new tech stacks and can only sleep comfortably once a problem is solved. <br/><br/>I strive for excellence and will never stop learning so that I can confidently say: <span class="italic font-bold text-pink">I can build anything.</span></p>
        {/if}
    </div>
    <div class="py-2 md:px-0 text-md">
        <Projects />
        <br/>
        <Work />
        <br/>
        <Certifications />
    </div>
</div> 