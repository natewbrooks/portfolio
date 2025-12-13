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

<main class="mx-auto max-w-3xl font-sans h-full w-full text-sm md:text-md">
	{@render children?.()}
</main>
