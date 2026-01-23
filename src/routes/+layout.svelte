<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon/favicon.ico';
	import { setContext, onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import IconCV from "~icons/tabler/file-cv";
	import IconHome from "~icons/mdi/home";
	import Header from '../sections/Header.svelte';
	import CvView from '../modules/views/CvView.svelte';

	let { children } = $props();
	let scrollY: number = $state(0);
	let windowWidth: number = $state(0);
	let scrolled: boolean = $state(false);
	
	let isTransitioning = $state(false);
	let transitionDirection = $state<'to-cv' | 'to-home'>('to-cv');
	let contentFadingIn = $state(false);
	
	// Track current view - initialize based on URL
	let currentView = $state<'home' | 'cv'>('home');
	
	// Sync with initial URL on mount
	onMount(() => {
		currentView = window.location.pathname === '/cv' ? 'cv' : 'home';
		
		// Handle browser back/forward
		window.addEventListener('popstate', () => {
			const newView = window.location.pathname === '/cv' ? 'cv' : 'home';
			if (newView !== currentView) {
				transitionDirection = newView === 'cv' ? 'to-cv' : 'to-home';
				isTransitioning = true;
			}
		});
	});

	// Derive for contexts
	let isOnCvPage = $derived(currentView === 'cv');

	setContext("hasScrolled", () => scrolled)
	setContext("isOnCvPage", () => isOnCvPage)
	setContext("isTransitioningToCv", () => isTransitioning && transitionDirection === 'to-cv')
	setContext("isTransitioningToHome", () => isTransitioning && transitionDirection === 'to-home')
	
	// Navigation functions for components
	function navigateToCv() {
		if (currentView === 'cv' || isTransitioning) return;
		transitionDirection = 'to-cv';
		isTransitioning = true;
	}
	
	function navigateToHome() {
		if (currentView === 'home' || isTransitioning) return;
		transitionDirection = 'to-home';
		isTransitioning = true;
	}
	
	setContext("navigateToCv", navigateToCv);
	setContext("navigateToHome", navigateToHome);

	// Intercept SvelteKit navigation - prevent actual page loads
	beforeNavigate(({ to, cancel }) => {
		const toPath = to?.url.pathname;
		
		if (toPath === '/cv' && currentView !== 'cv') {
			cancel();
			navigateToCv();
		} else if (toPath === '/' && currentView !== 'home') {
			cancel();
			navigateToHome();
		} else if (toPath === '/' || toPath === '/cv') {
			// Already on target, just cancel navigation
			cancel();
		}
	});

	function handleTransitionEnd() {
		// Update view and URL without reload
		if (transitionDirection === 'to-cv') {
			currentView = 'cv';
			history.pushState({}, '', '/cv');
		} else {
			currentView = 'home';
			history.pushState({}, '', '/');
		}
		isTransitioning = false;
		contentFadingIn = true;
		// Scroll to top on view change
		window.scrollTo({ top: 0, behavior: 'instant' });
		// Reset fade-in state after animation completes
		setTimeout(() => contentFadingIn = false, 300);
	}

	$effect(() => {
		// do not reset when reaching top
		if(!scrolled && scrollY > 10 && windowWidth < 800) {
			scrolled = true;
		}
	})
</script>

<svelte:head>
	<title>nate w. brooks</title>
	<link rel="icon" href={favicon} />
	<link
		rel="preload"
		as="image"
		href="/images/mrfox.GIF"
		type="image/gif"
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link
		rel="preload"
		as="style"
		href="https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding:wght@400;700&display=swap"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding:wght@400;700&display=swap"
		media="print"
	/>
	<noscript>
		<link
			rel="stylesheet"
			href="https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding:wght@400;700&display=swap"
		/>
	</noscript>

</svelte:head>

<svelte:window bind:innerWidth={windowWidth} bind:scrollY={scrollY} />

<div class="crt-on">
    <div class="crt-overlay"></div>
</div>

<main class="mx-auto max-w-3xl font-sans h-full w-full text-sm md:text-md">
	<Header />
	
	<div class="relative">
		{#if isTransitioning}
			<div 
				class="absolute inset-x-0 top-0 flex items-start justify-center pt-16 "
			>
				<div 
					class={transitionDirection === 'to-cv' ? 'icon-animate-cv' : 'icon-animate-home'}
					class:text-pink={transitionDirection === 'to-cv'}
					class:text-orange={transitionDirection === 'to-home'}
					onanimationend={handleTransitionEnd}
				>
					{#if transitionDirection === 'to-cv'}
						<IconCV class="w-20 h-20 md:w-28 md:h-28" />
					{:else}
						<IconHome class="w-20 h-20 md:w-28 md:h-28" />
					{/if}
				</div>
			</div>
		{/if}
		
		<div 
			class="transition-all duration-300 ease-out"
			class:opacity-0={isTransitioning}
			class:content-fade-in={contentFadingIn}
		>
			<!-- Always render both views, hide inactive one - PDF stays loaded -->
			<div class:hidden={currentView !== 'home'}>
				{@render children?.()}
			</div>
			<div class:hidden={currentView !== 'cv'}>
				<CvView />
			</div>
		</div>
	</div>
</main>

<style>
	.icon-animate-cv {
		animation: iconFadeIn 0.6s ease-out forwards;
	}
	
	.icon-animate-home {
		animation: iconFadeIn 0.6s ease-out forwards;
	}

	@keyframes iconFadeIn {
		0% {
			opacity: 0;
			transform: scale(0.5) rotate(-10deg);
		}
		50% {
			opacity: 1;
			transform: scale(1.1) rotate(5deg);
		}
		100% {
			opacity: 1;
			transform: scale(1) rotate(0deg);
		}
	}

	.content-fade-in {
		animation: contentFadeIn 0.3s ease-out forwards;
	}

	@keyframes contentFadeIn {
		0% {
			opacity: 0;
			transform: translateY(10px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
