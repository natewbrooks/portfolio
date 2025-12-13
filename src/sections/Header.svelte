<script lang="ts">
    import IconGithub from '~icons/mdi/github'
    import IconMail from '~icons/uil/envelope'
    import IconCV from '~icons/tabler/file-cv'
	import StatusMarquee from '../modules/StatusMarquee.svelte';

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
                        <span class="font-bold text-2xl text-orange ">nate w. brooks</span>
                        <h1 class=" text-pink text-md">software engineer</h1>
                        <h1 class=" text-purple text-md"> cs @ towson</h1>
                    </div>

                    <div class={[!hasScrolled() ? "justify-center w-full sm:w-fit" : "justify-end", "group flex space-x-2 "]}>
                        <div class={[!hasScrolled() ? "text-2xl" : "text-lg", "sm:text-lg flex flex-col w-fit  justify-end items-center"]}>
                            <button class="border-l-2 px-2 text-orange border-orange" name="github">
                                <a href="https://github.com/natewbrooks" target="_blank" aria-label="github link">
                                    <IconGithub class=""/>
                                </a>
                            </button>
                            <button class="border-l-2 px-2 py-1 text-pink border-pink" name="resume">
                                <a href="/cv" aria-label="resume page link">
                                    <IconCV class=""/>
                                </a>
                            </button>
                            <button class="border-l-2 px-2 border-purple text-purple" name="email">
                                <a href="mailto:natewbrooks@gmail.com" aria-label="email link">
                                    <IconMail class=""/>
                                </a>
                            </button>
                        </div>
                            <a 
                            href={"/cv"}
                            class={[!hasScrolled() ? "w-42 " : "w-24", " sm:w-28 h-full rounded-tr-[50%] rounded-tl-[60%] rounded-bl-none rounded-br-[60%] overflow-hidden z-10"]}>

                            <img
                                src={"images/mrfox.GIF"}
                                class="w-[155px] h-[140px] sm:w-[105px] sm:h-[95px]"
                                alt="profile pic"
                            />
                        </a>
                    </div>
            </div>
        {/key}
        <StatusMarquee/>
        <div class="px-4 lg:px-0 border-light border-t-1 pt-6 ">
            <!-- {#if revealAbout}
                <p transition:slide={{axis: "y"}} class="  text-sm pb-4 -z-10">Hello! I’m 21 years old and am very passoniate about programming and have been since I was around 10 years old developing Minecraft plugins. I love learning and building with new tech stacks and can only sleep comfortably when my current problem is solved. <br/><br/>Every project teaches me something new. I have a passion for UI/UX design and architecting projects that will help others.  My goal is simple: I want to know <span class="text-pink">I can build anything</span> with absolute confidence.</p>
            {/if} -->
            <p class="text-sm pb-4 -z-10">
                I’m 21 years old and have been <span class="text-green">deeply passionate about programming</span> since I was around 10, when I started building <span>Minecraft plugins</span>.
                I love learning and building with new tech stacks, and I only sleep comfortably once my <span class="text-orange">current problem is solved</span>.
                <br /><br />
                Every project teaches me something new. I have a strong passion for <span class="text-purple">UI/UX design</span> and <span class="text-blue">architecting systems</span> that genuinely help others.
                My goal is simple:
                <span class="text-pink font-medium">to know I can build anything with absolute confidence.</span>
            </p>
        </div>
    </header>