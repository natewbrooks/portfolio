<script lang="ts">
  import { getContext } from "svelte";
  import IconGithub from "~icons/mdi/github";
  import IconMail from "~icons/uil/envelope";
  import IconCV from "~icons/tabler/file-cv";
  import IconLinkedin from "~icons/mdi/linkedin"
  import IconHome from "~icons/mdi/home";
  import StatusMarquee from "../modules/StatusMarquee.svelte";

  const getIsOnCvPage = getContext<() => boolean>("isOnCvPage");
  const getIsOnHomePage = getContext<() => boolean>("isOnHomePage");
  const getIsOnMailPage = getContext<() => boolean>("isOnMailPage");
  const getIsTransitioningToCv = getContext<() => boolean>("isTransitioningToCv");
  const getIsTransitioningToHome = getContext<() => boolean>("isTransitioningToHome");
  const getIsTransitioningToMail = getContext<() => boolean>("isTransitioningToMail");
  const navigateToCv = getContext<() => void>("navigateToCv");
  const navigateToHome = getContext<() => void>("navigateToHome");
  const navigateToMail = getContext<() => void>("navigateToMail");
  
  let isOnHomePage = $derived(getIsOnHomePage?.() ?? false);
  let isOnCvPage = $derived(getIsOnCvPage?.() ?? false);
  let isOnMailPage = $derived(getIsOnMailPage?.() ?? false);
  let isTransitioningToCv = $derived(getIsTransitioningToCv?.() ?? false);
  let isTransitioningToHome = $derived(getIsTransitioningToHome?.() ?? false);
  let isTransitioningToMail = $derived(getIsTransitioningToMail?.() ?? false);
  
  let homeTabActive = $derived((isOnHomePage && !isTransitioningToCv && !isTransitioningToMail) || isTransitioningToHome);
  // CV tab should be "active" (dimmed) when on CV page or transitioning to it
  let cvTabActive = $derived((isOnCvPage && !isTransitioningToHome && !isTransitioningToMail) || isTransitioningToCv);
  // Mail tab should be "active" (dimmed) when on mail page or transitioning to it
  let mailTabActive = $derived((isOnMailPage && !isTransitioningToHome && !isTransitioningToCv) || isTransitioningToMail);
  
  function handleProfileClick() {
    if (isOnCvPage || isOnMailPage) {
      navigateToHome?.();
    } else {
      navigateToCv?.();
    }
  }
</script>

<header class="crt sticky top-0 w-full pt-4 md:pt-12 space-y-2 border-b-2 border-light pb-2 bg-darkest z-30">
  <div class="flex items-center w-full space-x-2 px-4 lg:px-0 flex-row justify-between">
    <div class="flex flex-col justify-center text-start">
      <span class="font-bold text-2xl text-orange">nate w. brooks</span>
      <h1 class="text-pink">software engineer</h1>
      <h1 class="text-purple">cs @ towson</h1>
      <div class="group flex text-sm gap-2 py-0.5">
            <button class="w-fit  sm:py-1 text-white border-orange" name="github">
              <a href="https://github.com/natewbrooks" target="_blank" aria-label="github link">
                <IconGithub />
              </a>
          </button>
          <button class="w-fit sm:py-1 text-blue border-blue" name="github">
              <a href="https://www.linkedin.com/in/nate-brooks-7b16382b2/" target="_blank" aria-label="github link">
                <IconLinkedin />
              </a>
          </button>
        </div>

    </div>

    <div class="group flex justify-end">
      <div class="sm:text-xl flex flex-col w-fit justify-end items-center text-lg">
        <button 
          class={[
            "border-l-2 px-2 py-1 sm:py-0.5 text-orange border-orange transition-all duration-500 ease-out cursor-pointer",
            homeTabActive ? "opacity-20" : ""
          ]}
          name="home"
          onclick={() => isOnHomePage ? undefined : navigateToHome?.()}
          aria-label={isOnHomePage ? "home page link (active)" : "home page link"}
        >
          <IconHome />
        </button>
        <button 
          class={[
            "border-l-2 px-2 py-1 sm:py-0.5 text-pink border-pink transition-all duration-500 ease-out cursor-pointer",
            cvTabActive && "opacity-20"
          ]}
          name="resume"
          onclick={() => isOnCvPage ? navigateToHome?.() : navigateToCv?.()}
          aria-label={isOnCvPage ? "home page link" : "resume page link"}
        >
          <IconCV />
        </button>

        <button 
          class={[
            "border-l-2 px-2 py-1 sm:py-0.5 border-purple text-purple transition-all duration-500 ease-out cursor-pointer",
            mailTabActive && "opacity-20"
          ]}
          name="email"
          onclick={() => isOnMailPage ? navigateToHome?.() : navigateToMail?.()}
          aria-label={isOnMailPage ? "home page link" : "contact page link"}
        >
          <IconMail />
        </button>
      </div>

      <button
        onclick={handleProfileClick}
        class="relative h-full rounded-tr-[50%] rounded-tl-[60%] rounded-bl-none rounded-br-[60%] overflow-hidden z-10 cursor-pointer"
      >
        <img
          src="images/nate.png"
          class="hidden xs:block w-[105px] sm:h-[95px] scale-115"
          alt="profile pic"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
      </button>
    </div>
  </div>

  <StatusMarquee />
</header>
