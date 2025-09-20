<script lang="ts">
    import pfp from '$lib/assets/pfp.webp'
    import pet from '$lib/assets/pet.png'
    import kris from '$lib/assets/kris.GIF'
    import IconGithub from '~icons/mdi/github'
    import IconLinkedin from '~icons/mdi/linkedin'
    import IconMail from '~icons/uil/envelope-open'
    import IconCV from '~icons/tabler/file-cv'
    import IconDiscord from '~icons/ic/baseline-discord'
	import StatusMarquee from '../modules/StatusMarquee.svelte';
	import { slide } from 'svelte/transition';
	import { getContext } from 'svelte';
	import { elasticInOut } from 'svelte/easing';

    // const hasScrolled: typeof Function = getContext("hasScrolled");
    const hasScrolled = () => false;

    let revealAbout = $state(false)
3
    function toggleAbout() {
        revealAbout = !revealAbout;
    }

</script>

<header class="w-full pt-4  md:pt-20 z-30 space-y-4 border-b-1 border-light pb-2 bg-darkest">
        
        {#key hasScrolled()}
            <div 
            class={[!hasScrolled() ? "flex flex-col sm:flex-row sm:justify-between sm:space-x-8" :
                "flex-row justify-between items-center", "flex  w-full space-x-2 px-4 lg:px-0"
            ]}>
                    
                    <div class="flex flex-col justify-end text-start">
                        <span class="font-bold text-2xl text-white ">nate w. brooks</span>
                        <h1 class="italic text-pink text-md">software engineer</h1>
                        <h1 class="italic text-orange text-md"> cs @ towson</h1>
                    </div>

                    <div class={[!hasScrolled() ? "justify-center w-full sm:w-fit" : "justify-end", "group flex space-x-2 "]}>
                        <div class={[!hasScrolled() ? "text-2xl " : "text-lg", "sm:text-lg flex flex-col space-y-2 w-fit  justify-end items-center"]}>
                            <button>
                                <a href="https://github.com/natewbrooks" target="_blank">
                                    <IconGithub class="text-white"/>
                                </a>
                            </button>
                            <button>
                                <a href="/cv">
                                    <IconCV class="text-white"/>
                                </a>
                            </button>
                            <button>
                                <a href="mailto:natewbrooks@gmail.com">
                                    <IconMail class=""/>
                                </a>
                            </button>
                        </div>
                            <a 
                            href={"/cv"}
                            onmouseenter={() => toggleAbout()}
                            onmouseleave={() => toggleAbout()}
                            class={[!hasScrolled() ? "w-42 " : "w-24", " sm:w-28 h-full rounded-tr-[50%] rounded-tl-[60%] rounded-bl-none rounded-br-[60%] overflow-hidden z-10"]}>

                            <img
                                src={"images/mrfox.GIF"}
                                class=""
                                alt="profile pic"
                            />
                        </a>
                    </div>
            </div>
        {/key}
        <StatusMarquee/>
        <div class="hidden md:block  border-light ">
            {#if revealAbout}
                <p transition:slide={{axis: "y"}} class="  text-xs pb-4 -z-10">Hello! I’m 21 years old and am very passoniate about programming and have been since I was around 10 years old developing Minecraft plugins. I love learning and building with new tech stacks and can only sleep comfortably when my current problem is solved. <br/><br/>Every project teaches me something new. I have a passion for UI/UX design and architecting projects that will help others.  My goal is simple: I want to feel like <span class="text-pink">I can build anything</span> with absolute confidence.</p>
            {/if}
        </div>
    </header>