<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon/favicon.ico';
	import { setContext, onMount } from 'svelte';
	import { beforeNavigate, pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import IconCV from "~icons/tabler/file-cv";
	import IconHome from "~icons/mdi/home";
	import IconMail from "~icons/uil/envelope";
	import Header from '../sections/Header.svelte';
	import CvView from '../modules/views/CvView.svelte';
	import HomeView from '../modules/views/HomeView.svelte';
	import MailView from '../modules/views/MailView.svelte';
	import type { LayoutProps } from './$types';

	let { data }: LayoutProps = $props();
	let scrollY: number = $state(0);
	let windowWidth: number = $state(0);
	let scrolled: boolean = $state(false);
	let mounted = $state(false);
	
	let isTransitioning = $state(false);
	let transitionDirection = $state<'to-cv' | 'to-home' | 'to-mail'>('to-cv');
	let contentVisible = $state(true);
	let contentFadingOut = $state(false);
	let contentFadingIn = $state(false);
	
	// Track current view - initialize based on URL from page store
	function getViewFromPath(path: string): 'home' | 'cv' | 'mail' {
		if (path === '/cv') return 'cv';
		if (path === '/mail') return 'mail';
		return 'home';
	}
	
	let currentView = $state<'home' | 'cv' | 'mail'>(getViewFromPath($page.url.pathname));
	
	// Sync with initial URL on mount
	onMount(() => {
		mounted = true;
		currentView = getViewFromPath(window.location.pathname);
		
		// Handle browser back/forward
		const handlePopstate = () => {
			const newView = getViewFromPath(window.location.pathname);
			if (newView !== currentView) {
				transitionDirection = newView === 'cv' ? 'to-cv' : newView === 'mail' ? 'to-mail' : 'to-home';
				startTransition();
			}
		};
		
		window.addEventListener('popstate', handlePopstate);
		return () => window.removeEventListener('popstate', handlePopstate);
	});

	// Derive for contexts
	let isOnCvPage = $derived(currentView === 'cv');
	let isOnMailPage = $derived(currentView === 'mail');
	let isOnHomePage = $derived(currentView === 'home');

	setContext("hasScrolled", () => scrolled)
	setContext("isOnCvPage", () => isOnCvPage)
	setContext("isOnMailPage", () => isOnMailPage)
	setContext("isOnHomePage", () => isOnHomePage)
	setContext("isTransitioningToCv", () => isTransitioning && transitionDirection === 'to-cv')
	setContext("isTransitioningToHome", () => isTransitioning && transitionDirection === 'to-home')
	setContext("isTransitioningToMail", () => isTransitioning && transitionDirection === 'to-mail')
	
	// Unified transition starter - fades out content, then shows icon
	function startTransition() {
		if (isTransitioning) return;
		
		// Start fade out
		contentFadingOut = true;
		
		// After fade out completes, hide content and show icon
		setTimeout(() => {
			contentVisible = false;
			contentFadingOut = false;
			isTransitioning = true;
		}, 150); // Match the fade-out duration
	}
	
	// Navigation functions for components
	function navigateToCv() {
		if (currentView === 'cv' || isTransitioning || contentFadingOut) return;
		transitionDirection = 'to-cv';
		startTransition();
	}
	
	function navigateToHome() {
		if (currentView === 'home' || isTransitioning || contentFadingOut) return;
		transitionDirection = 'to-home';
		startTransition();
	}
	
	function navigateToMail() {
		if (currentView === 'mail' || isTransitioning || contentFadingOut) return;
		transitionDirection = 'to-mail';
		startTransition();
	}
	
	setContext("navigateToCv", navigateToCv);
	setContext("navigateToHome", navigateToHome);
	setContext("navigateToMail", navigateToMail);

	// Intercept SvelteKit navigation - prevent actual page loads
	beforeNavigate(({ to, cancel }) => {
		const toPath = to?.url.pathname;
		
		if (toPath === '/cv' && currentView !== 'cv') {
			cancel();
			navigateToCv();
		} else if (toPath === '/mail' && currentView !== 'mail') {
			cancel();
			navigateToMail();
		} else if (toPath === '/' && currentView !== 'home') {
			cancel();
			navigateToHome();
		} else if (toPath === '/' || toPath === '/cv' || toPath === '/mail') {
			cancel();
		}
	});

	function handleTransitionEnd() {
		// Update view and URL without reload
		if (transitionDirection === 'to-cv') {
			currentView = 'cv';
			pushState('/cv', {});
		} else if (transitionDirection === 'to-mail') {
			currentView = 'mail';
			pushState('/mail', {});
		} else {
			currentView = 'home';
			pushState('/', {});
		}
		
		isTransitioning = false;
		
		// Scroll to top on view change
		window.scrollTo({ top: 0, behavior: 'instant' });
		
		// Fade content back in
		contentFadingIn = true;
		contentVisible = true;
		
		// Reset fade-in state after animation completes
		setTimeout(() => contentFadingIn = false, 300);
	}

	$effect(() => {
		if(!scrolled && scrollY > 10 && windowWidth < 800) {
			scrolled = true;
		}
	})

	if (data?.spotify) setContext('spotify-data', data.spotify);
	if (data?.github) setContext('github-data', data.github);
</script>

<svelte:head>
	<title>nate w. brooks</title>
	<meta name="description" content="Portfolio site for Nate Brooks – Software Engineer." />
	<link rel="icon" href={favicon} />
	<link
		rel="preload"
		as="image"
		href="/images/nate.png"
		type="image/png"
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com">
</svelte:head>

<svelte:window bind:innerWidth={windowWidth} bind:scrollY={scrollY} />

<main class="mx-auto max-w-3xl font-sans h-full w-full text-sm md:text-md">
	<Header />
    
	<div class="relative">
		{#if isTransitioning}
			<div 
				class="absolute inset-x-0 top-0 flex items-start justify-center pt-16 z-10"
			>
				<div 
					class="icon-animate"
					class:text-pink={transitionDirection === 'to-cv'}
					class:text-orange={transitionDirection === 'to-home'}
					class:text-purple={transitionDirection === 'to-mail'}
					onanimationend={handleTransitionEnd}
				>
					{#if transitionDirection === 'to-cv'}
						<IconCV class="w-20 h-20 md:w-28 md:h-28" />
					{:else if transitionDirection === 'to-mail'}
						<IconMail class="w-20 h-20 md:w-28 md:h-28" />
					{:else}
						<IconHome class="w-20 h-20 md:w-28 md:h-28" />
					{/if}
				</div>
			</div>
		{/if}
		
		<div 
			class:content-fade-out={contentFadingOut}
			class:content-fade-in={contentFadingIn}
			class:content-hidden={!contentVisible}
			style:visibility={contentVisible ? 'visible' : 'hidden'}
		>
			<div style:display={currentView === 'home' ? 'block' : 'none'}>
				<HomeView spotify={data.spotify} github={data.github} />
			</div>
			<div style:display={currentView === 'cv' ? 'block' : 'none'}>
				<CvView />
			</div>
			<div style:display={currentView === 'mail' ? 'block' : 'none'}>
				<MailView />
			</div>
		</div>
	</div>
</main>

<style>
	.icon-animate {
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

	.content-fade-out {
		animation: contentFadeOut 0.15s ease-out forwards;
	}

	@keyframes contentFadeOut {
		0% {
			opacity: 1;
			transform: translateY(0);
		}
		100% {
			opacity: 0;
			transform: translateY(-10px);
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

	.content-hidden :global(svg),
	.content-hidden :global(img) {
		visibility: hidden !important;
		opacity: 0 !important;
	}
</style>