<script lang="ts">
  import { getContext } from "svelte";
  import IconGithub from "~icons/mdi/github";
  import IconMail from "~icons/uil/envelope";
  import IconCV from "~icons/tabler/file-cv";
  import IconLinkedin from "~icons/mdi/linkedin";
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
  let cvTabActive = $derived((isOnCvPage && !isTransitioningToHome && !isTransitioningToMail) || isTransitioningToCv);
  let mailTabActive = $derived((isOnMailPage && !isTransitioningToHome && !isTransitioningToCv) || isTransitioningToMail);
  
  // Social links (external)
  const socialLinks = [
    { 
      icon: IconGithub, 
      href: "https://github.com/natewbrooks", 
      label: "GitHub",
      colorClass: "text-white"
    },
    { 
      icon: IconLinkedin, 
      href: "https://www.linkedin.com/in/nate-brooks-7b16382b2/", 
      label: "LinkedIn",
      colorClass: "text-blue"
    },
  ];

  // Navigation tabs (internal)
  const navTabs = [
    {
      icon: IconHome,
      name: "home",
      colorClass: "text-orange border-orange",
      getIsActive: () => homeTabActive,
      onClick: () => !isOnHomePage && navigateToHome?.(),
      getAriaLabel: () => isOnHomePage ? "home page (active)" : "home page"
    },
    {
      icon: IconCV,
      name: "resume",
      colorClass: "text-pink border-pink",
      getIsActive: () => cvTabActive,
      onClick: () => isOnCvPage ? navigateToHome?.() : navigateToCv?.(),
      getAriaLabel: () => isOnCvPage ? "home page" : "resume page"
    },
    {
      icon: IconMail,
      name: "email",
      colorClass: "text-purple border-purple",
      getIsActive: () => mailTabActive,
      onClick: () => isOnMailPage ? navigateToHome?.() : navigateToMail?.(),
      getAriaLabel: () => isOnMailPage ? "home page" : "contact page"
    },
  ];
  
  function handleProfileClick() {
    if (isOnCvPage || isOnMailPage) {
      navigateToHome?.();
    } else {
      navigateToCv?.();
    }
  }
</script>

<header class="crt sticky top-0 w-full pt-4 md:pt-12 space-y-2 border-b-1 border-dark pb-2 bg-darkest z-30">
  <div class="flex items-center w-full space-x-2 px-4 lg:px-0 flex-row justify-between">
    <div class="flex flex-col justify-center text-start">
      <span class="font-bold text-[20px] text-orange">nate w. brooks</span>
      <h1 class="text-pink font-bold">software engineer</h1>
      <h1 class="text-purple font-bold">@ gopanda</h1>
      
      <div class="group flex text-[18px] gap-2 pt-1">
        {#each socialLinks as { icon: Icon, href, label, colorClass }}
          <a 
            {href} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={label}
            class={`w-fit sm:py-1 ${colorClass}`}
          >
            <Icon />
          </a>
        {/each}
      </div>
    </div>

    <div class="group flex justify-end">
      <div class="sm:text-[20px] flex flex-col w-fit justify-end items-center text-xl">
        {#each navTabs as { icon: Icon, name, colorClass, getIsActive, onClick, getAriaLabel }}
          <button 
            onclick={onClick}
            class={[
              "relative px-2 py-1 sm:py-0.5 transition-all duration-300 ease-out cursor-pointer",
              colorClass,
              getIsActive() && ""
            ]}
          >
            <span 
              class={[
                "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-current transition-all duration-300",
                getIsActive() && "h-full"
              ]}
            ></span>
            <Icon />
          </button>
          <!-- Glow effect -->
          <!-- <button 
            onclick={onClick}
            class={[
              "px-2 py-1 sm:py-0.5 transition-all duration-300 ease-out cursor-pointer",
              colorClass,
              getIsActive() 
                ? "drop-shadow-[0_0_8px_currentColor] scale-110" 
                : "opacity-50 hover:opacity-100"
            ]}
          >
            <Icon />
          </button> -->
        {/each}
      </div>

      <button
        onclick={handleProfileClick}
        class="relative h-full rounded-tr-[50%] rounded-tl-[60%] rounded-bl-none rounded-br-[60%] overflow-hidden z-10 cursor-pointer"
      >
        <img
          src="images/optimized/nate.webp"
          class="block w-[105px] h-[95px] object-cover object-[50%_5%]"
          alt="profile pic"
          width="105"
          height="95"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
      </button>
    </div>
  </div>

  <StatusMarquee />
</header>