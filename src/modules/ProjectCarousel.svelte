<script lang="ts">
    import { onMount } from 'svelte';
    import { register } from 'swiper/element/bundle';
    register();

    let { projects, highlighted, setHighlighted, yearColor } = $props();

    let swiperEl: HTMLElement;
    let swiperInstance: any;

    const swiperParams = {
        mousewheelForceToAxis: true,
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
</script>

<!-- Add init="false" to prevent auto-initialization -->
<swiper-container bind:this={swiperEl} init="false">         
    {#each projects as project, i}
        <swiper-slide>
            <img
                onmouseenter={() => handleCarouselItemInteraction(project)}
                onmouseleave={() => setHighlighted("")}
                onclick={() => handleCarouselItemInteraction(project)}
                id={"project-img-" + project.name.toLowerCase().replace(/\s+/g, '-') + "-" + i}
                src={project.img}
                class={[highlighted.toLowerCase()==project.name.toLowerCase() && `border-2 ${"border-" + yearColor(project.year).split("-")[1]} ${yearColor(project.year)}`, "border-2 bg-light aspect-video w-full text-center text-light rounded-sm hover:cursor-grab active:cursor-grabbing active:scale-95"]}
                alt={project.name}
            />
        </swiper-slide>
    {/each}
</swiper-container>