<script lang="ts">
    import { onMount } from 'svelte';
    import { register } from 'swiper/element/bundle';
    import IconLeftArrow from '~icons/picon/left'
    import IconRightArrow from '~icons/picon/right'

    register();

    let { projects, highlighted, setHighlighted, yearStyles } = $props();

    let swiperEl: HTMLElement;
    let swiperInstance: any;

    const swiperParams = {
        mousewheel: {
            enabled: true,
            forceToAxis: true,       // only move when wheel intent matches axis
            releaseOnEdges: true,    // bubble wheel back to page when at ends
            thresholdDelta: 20,      // reduce accidental micro-scroll slide changes
            sensitivity: 1
        },
        loop: false, // Disable loop for easier slide navigation
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
        speed: 800,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 4,
            },
            320: {
                slidesPerView: 2,
                spaceBetween: 4
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 4
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 4
            }
        }
    };

    // Function to scroll to a specific project in the carousel
    export function scrollToProject(projectName: string) {
        if (!swiperInstance) return;
        
        const projectIndex = projects.findIndex(p => 
            p.name.toLowerCase() === projectName.toLowerCase()
        );
        
        if (projectIndex !== -1) {
            swiperInstance.slideTo(projectIndex);
        }
    }

    // Function to scroll the project list to show highlighted item
    function scrollToProjectInList(projectName: string) {
        const sanitizedName = projectName.toLowerCase().replace(/\s+/g, '-');
        const el = document.getElementById(`project-${sanitizedName}`);
        
        if (el) {
            // Find the scrollable container
            const scrollContainer = el.closest('.overflow-y-auto');
            if (scrollContainer) {
                const containerRect = scrollContainer.getBoundingClientRect();
                const elementRect = el.getBoundingClientRect();
                
                // Check if element is not fully visible
                if (elementRect.top < containerRect.top || elementRect.bottom > containerRect.bottom) {
                    el.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    });
                }
            }
        }
    }

    // Handle hover/click on carousel items
    function handleCarouselItemInteraction(project: any) {
        setHighlighted(project.name);
        scrollToProjectInList(project.name);
    }

    onMount(() => {
        Object.assign(swiperEl, swiperParams);
        swiperEl.initialize();
        
        // Get swiper instance after initialization
        swiperInstance = swiperEl.swiper;
    });

    function nextSlide() {
        swiperInstance?.slideNext();
    }

    function prevSlide() {
        swiperInstance?.slidePrev();
    }
</script>

<div class="relative">
    <swiper-container bind:this={swiperEl} init="false">         
        {#each projects as project, i}
            <swiper-slide>
                <img
                    onmouseenter={() => handleCarouselItemInteraction(project)}
                    onmouseleave={() => setHighlighted("")}
                    onclick={() => handleCarouselItemInteraction(project)}
                    id={"project-img-" + project.name.toLowerCase().replace(/\s+/g, '-') + "-" + i}
                    src={project.img}
                    class={[highlighted.toLowerCase()==project.name.toLowerCase() && `border-2 ${yearStyles(project.year).border} `, "border-2 bg-light aspect-video w-full text-center text-light rounded-sm hover:cursor-grab active:cursor-grabbing active:scale-95"]}
                    alt={project.name}
                />
            </swiper-slide>
        {/each}
    </swiper-container>

    <button
            class="hidden md:block absolute -translate-y-1/2 top-1/2 -left-10 text-white/50 opacity-50 px-2 py-1 rounded-l hover:bg-darkest"
            onclick={prevSlide}
        >
            <IconLeftArrow class="text-xl" />
        </button>

    <button
            class="hidden md:block  absolute -translate-y-1/2 top-1/2  -right-10 text-white/50 opacity-50 px-2 py-1 rounded-l hover:bg-darkest"
            onclick={nextSlide}
        >
            <IconRightArrow class="text-xl" />
        </button>
</div>