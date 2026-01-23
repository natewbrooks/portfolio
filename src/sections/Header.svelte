<script lang="ts">
  import { getContext } from "svelte";
  import IconGithub from "~icons/mdi/github";
  import IconMail from "~icons/uil/envelope";
  import IconCV from "~icons/tabler/file-cv";
  import IconHome from "~icons/mdi/home";
  import StatusMarquee from "../modules/StatusMarquee.svelte";

  const getIsOnCvPage = getContext<() => boolean>("isOnCvPage");
  const getIsTransitioningToCv = getContext<() => boolean>("isTransitioningToCv");
  const getIsTransitioningToHome = getContext<() => boolean>("isTransitioningToHome");
  const navigateToCv = getContext<() => void>("navigateToCv");
  const navigateToHome = getContext<() => void>("navigateToHome");
  
  let isOnCvPage = $derived(getIsOnCvPage?.() ?? false);
  let isTransitioningToCv = $derived(getIsTransitioningToCv?.() ?? false);
  let isTransitioningToHome = $derived(getIsTransitioningToHome?.() ?? false);
  
  // CV tab should be "active" (pulled out + dimmed) when:
  // - On CV page (but NOT if transitioning back to home)
  // - OR transitioning TO CV page
  let cvTabActive = $derived((isOnCvPage && !isTransitioningToHome) || isTransitioningToCv);
  
  let isHoveringPic = $state(false);
  
  function handleProfileClick() {
    if (isOnCvPage) {
      navigateToHome?.();
    } else {
      navigateToCv?.();
    }
  }
</script>

<header class="sticky top-0 w-full pt-4 md:pt-12 z-30 space-y-2 border-b-2 border-light pb-2 bg-darkest">
  <div class="flex items-start xs:items-center w-full space-x-2 px-4 lg:px-0 flex-row justify-between">
    <div class="flex flex-col justify-end text-start">
      <span class="font-bold text-2xl text-orange">nate w. brooks</span>
      <h1 class="text-pink">software engineer</h1>
      <h1 class="text-purple">cs @ towson</h1>
    </div>

    <div class="group flex justify-end">
      <div class="sm:text-xl flex flex-col w-fit justify-end items-center text-lg">
        <button class="border-l-2 px-2 py-1 sm:py-0.5 text-orange border-orange" name="github">
          <a href="https://github.com/natewbrooks" target="_blank" aria-label="github link">
            <IconGithub />
          </a>
        </button>

        <button 
          class={[
            "border-l-2 px-2 py-1 sm:py-0.5 text-pink border-pink transition-all duration-500 ease-out cursor-pointer",
            cvTabActive && "-translate-x-2 opacity-50"
          ]}
          name="resume"
          onclick={() => isOnCvPage ? navigateToHome?.() : navigateToCv?.()}
          aria-label={isOnCvPage ? "home page link" : "resume page link"}
        >
          <IconCV />
        </button>

        <button class="border-l-2 px-2 py-1 sm:py-0.5 border-purple text-purple" name="email">
          <a href="mailto:natewbrooks@gmail.com" aria-label="email link">
            <IconMail />
          </a>
        </button>
      </div>

      <button
        onclick={handleProfileClick}
        class="relative h-full rounded-tr-[50%] rounded-tl-[60%] rounded-bl-none rounded-br-[60%] overflow-hidden z-10 cursor-pointer"
        onmouseenter={() => isHoveringPic = true}
        onmouseleave={() => isHoveringPic = false}
      >
        <img
          src="images/nate.png"
          class="hidden xs:block w-[105px] sm:h-[95px] scale-115"
          alt="profile pic"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
        {#if isHoveringPic}
          <div class="absolute inset-0 flex items-center justify-center bg-darkest/60">
            {#if isOnCvPage}
              <IconHome class="w-8 h-8 text-orange opacity-70" />
            {:else}
              <IconCV class="w-8 h-8 text-pink opacity-70" />
            {/if}
          </div>
        {/if}
      </button>
    </div>
  </div>

  <StatusMarquee />
</header>
