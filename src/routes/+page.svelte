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
            <p transition:slide={{axis: "y"}} class="  text-xs pb-4 -z-10">Hello! I’m 21 years old and am very passoniate about programming and have been since I was around 10 years old developing Minecraft plugins. I love learning and building with new tech stacks and can only sleep comfortably when my current problem is solved. <br/><br/>Every project teaches me something new. I have a passion for UI/UX design and architecting projects that will help others.  My goal is simple: I want to feel like <span class="text-pink">I can build anything</span> with absolute confidence.</p>
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