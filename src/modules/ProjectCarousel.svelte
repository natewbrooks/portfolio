<script lang="ts">
  import { onMount, tick } from "svelte";
  import { register } from "swiper/element/bundle";
  import IconLeftArrow from "~icons/picon/left";
  import IconRightArrow from "~icons/picon/right";

  register();

  let { projects, highlighted, setHighlighted, yearStyles } = $props();

  const imgModules = import.meta.glob("/images/**/*.{webp,png,jpg,jpeg,gif,svg}", {
    eager: true,
    query: "?url",
    import: "default",
  }) as Record<string, string>;

  const IMG: Record<string, string> = Object.fromEntries(
    Object.entries(imgModules).map(([k, v]) => [k.replace("?url", ""), v])
  );

  const normalize = (p: string) => {
    const s = (p ?? "").trim();
    if (!s) return "";
    return s.startsWith("/") ? s : `/${s}`;
  };

  const resolvePath = (p: string) => {
    const raw = normalize(p);
    if (!raw) return "";
    return IMG[raw] ?? raw;
  };

  const resolveThumb = (project: any) => resolvePath(project?.imgThumb);
  const resolveFull = (project: any) => resolvePath(project?.imgFull ?? project?.imgThumb);

  let swiperEl: HTMLElement;
  let swiperInstance: any;

  const swiperParams = {
    mousewheel: {
      enabled: true,
      forceToAxis: true,
      releaseOnEdges: true,
      thresholdDelta: 20,
      sensitivity: 1
    },
    loop: false,
    autoplay: {
      delay: 2400,
      disableOnInteraction: true
    },
    speed: 400,
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 4 },
      420: { slidesPerView: 2, spaceBetween: 4 },
      640: { slidesPerView: 3, spaceBetween: 4 },
      1024: { slidesPerView: 3, spaceBetween: 4 }
    }
  };

  let isModalOpen = $state(false);
  let modalStartIndex = $state(0);
  let modalSwiperEl = $state<HTMLElement | null>(null);
  let modalSwiperInstance: any;

  const modalParams = {
    loop: false,
    speed: 250,
    slidesPerView: 1,
    spaceBetween: 12,
    navigation: false
  };

  function handleCarouselItemInteraction(project: any) {
    setHighlighted(project.name);
    scrollToProjectInList(project.name);
  }

  function scrollToProjectInList(projectName: string) {
    const sanitizedName = projectName.toLowerCase().replace(/\s+/g, "-");
    const el = document.getElementById(`project-${sanitizedName}`);
    if (!el) return;

    const scrollContainer = el.closest(".overflow-y-auto");
    if (!scrollContainer) return;

    const containerRect = scrollContainer.getBoundingClientRect();
    const elementRect = el.getBoundingClientRect();

    if (elementRect.top < containerRect.top || elementRect.bottom > containerRect.bottom) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  async function openModal(i: number, project: any) {
    modalStartIndex = i;
    handleCarouselItemInteraction(project);

    isModalOpen = true;
    await tick();

    if (!modalSwiperEl) return;

    Object.assign(modalSwiperEl, modalParams);
    modalSwiperEl.initialize();
    modalSwiperInstance = (modalSwiperEl as any).swiper;

    modalSwiperInstance.slideTo(modalStartIndex, 0);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    isModalOpen = false;
    document.body.style.overflow = "";
    modalSwiperInstance = null;
  }

  function onKeydown(e: KeyboardEvent) {
    if (!isModalOpen) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") modalSwiperInstance?.slidePrev();
    if (e.key === "ArrowRight") modalSwiperInstance?.slideNext();
  }

  onMount(() => {
    Object.assign(swiperEl, swiperParams);
    (swiperEl as any).initialize();
    swiperInstance = (swiperEl as any).swiper;

    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  });

  function nextSlide() {
    swiperInstance?.slideNext();
  }

  function prevSlide() {
    swiperInstance?.slidePrev();
  }

  function scrollToProject(projectName: string) {
    const index = projects.findIndex(
      (p: any) => p.name.toLowerCase() === projectName.toLowerCase()
    );
    if (index !== -1 && swiperInstance) {
      swiperInstance.slideTo(index);
    }
  }

  export { scrollToProject };
</script>

<div class="relative">
  <swiper-container bind:this={swiperEl} init="false">
    {#each projects as project, i}
      <swiper-slide>
        <button
          type="button"
          class="w-full"
          onmouseenter={() => handleCarouselItemInteraction(project)}
          onmouseleave={() => setHighlighted("")}
          onclick={() => openModal(i, project)}
          data-umami-event="project-preview-open"
          data-umami-event-project={project.name}
          aria-label={`Open ${project.name}`}
        >
          <img
            src={resolveThumb(project)}
            class={[
              highlighted.toLowerCase() === project.name.toLowerCase() && `border-2 ${yearStyles(project.year).border}`,
              "border-2 bg-light aspect-video w-full text-center text-light rounded-sm hover:cursor-grab active:cursor-grabbing active:scale-95"
            ]}
            loading={i < 2 ? "eager" : "lazy"}
            decoding="async"
            fetchpriority={i < 2 ? "high" : "auto"}
            alt={project.name}
          />
        </button>
      </swiper-slide>
    {/each}
  </swiper-container>

  <button
    class="hidden md:block absolute -translate-y-1/2 top-1/2 -left-10 text-white/60 opacity-50 px-2 py-1 rounded-l hover:bg-darkest"
    onclick={prevSlide}
    type="button"
    aria-label="Previous slide"
  >
    <IconLeftArrow class="text-xl" />
  </button>

  <button
    class="hidden md:block absolute -translate-y-1/2 top-1/2 -right-10 text-white/60 opacity-50 px-2 py-1 rounded-l hover:bg-darkest"
    onclick={nextSlide}
    type="button"
    aria-label="Next slide"
  >
    <IconRightArrow class="text-xl" />
  </button>
</div>

{#if isModalOpen}
  <div
    class="fixed inset-0 z-100 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    role="button"
    tabindex="0"
    aria-label="Close modal"
    onclick={closeModal}
    onkeydown={(e) => e.key === "Escape" && closeModal()}
  >
    <div class="relative w-full max-w-5xl">
      <swiper-container bind:this={modalSwiperEl} init="false">
        {#each projects as project}
          <swiper-slide>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <img
              src={resolveFull(project)}
              alt={project.name}
              class="w-full max-h-[80vh] object-contain rounded-md"
              draggable="false"
              loading="lazy"
              decoding="async"
              onclick={(e) => e.stopPropagation()}
            />
            <div
              class="mt-2 text-center text-white/60"
              role="button"
              tabindex="0"
              onclick={closeModal}
              onkeydown={(e) => e.key === 'Enter' && closeModal()}
            >
              {project.name}
            </div>
          </swiper-slide>
        {/each}
      </swiper-container>
    </div>
  </div>
{/if}
