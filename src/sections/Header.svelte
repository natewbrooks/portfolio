<script lang="ts">
  import IconGithub from "~icons/mdi/github";
  import IconMail from "~icons/uil/envelope";
  import IconCV from "~icons/tabler/file-cv";
  import StatusMarquee from "../modules/StatusMarquee.svelte";
</script>

<header class="sticky top-0 w-full pt-4 md:pt-12 z-30 space-y-4 border-b-1 border-light pb-2 bg-darkest">
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

        <button class="border-l-2 px-2 py-1 sm:py-0.5 text-pink border-pink" name="resume">
          <a href="/cv" aria-label="resume page link">
            <IconCV />
          </a>
        </button>

        <button class="border-l-2 px-2 py-1 sm:py-0.5 border-purple text-purple" name="email">
          <a href="mailto:natewbrooks@gmail.com" aria-label="email link">
            <IconMail />
          </a>
        </button>
      </div>

      <a
        href="/cv"
        class="h-full rounded-tr-[50%] rounded-tl-[60%] rounded-bl-none rounded-br-[60%] overflow-hidden z-10"
      >
        <img
          src="images/mrfox.GIF"
          class="hidden xs:block w-[105px] sm:h-[95px]"
          alt="profile pic"
        />
      </a>
    </div>
  </div>

  <StatusMarquee />
</header>
