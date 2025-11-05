<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon/favicon.ico';
	import { setContext } from 'svelte';

	let { children } = $props();
	let scrollY: number = $state(0);
	let windowWidth: number = $state(0);
	let scrolled: boolean = $state(false);

	setContext("hasScrolled", () => scrolled)

	$effect(() => {
		// do not reset when reaching top
		if(!scrolled && scrollY > 10 && windowWidth < 800) {
			scrolled = true;
		}
	})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:window bind:innerWidth={windowWidth} bind:scrollY={scrollY} />

<main class="mx-auto max-w-3xl mx-4 font-sans h-full w-full">
	{@render children?.()}
</main>
