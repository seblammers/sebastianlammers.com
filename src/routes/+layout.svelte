<script>
	import { fly } from 'svelte/transition';
	import { onMount, tick } from 'svelte';
	import { page } from '$app/stores';
	import Nav from '$lib/components/Nav.svelte';
	import Datawrapper from '$lib/components/Datawrapper.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Subfooter from '../lib/components/Subfooter.svelte';

	import '$lib/styles/global.scss';

	import '@fontsource/ibm-plex-sans/300.css';
	import '@fontsource/ibm-plex-sans/400.css';
	import '@fontsource/ibm-plex-sans/400-italic.css';
	import '@fontsource/ibm-plex-sans/500.css';
	import '@fontsource/ibm-plex-sans/700.css';
	// condensed for headings
	import '@fontsource/ibm-plex-sans-condensed/700.css';
	// mono for code
	import '@fontsource/ibm-plex-mono/400.css';

	export let data;

	// When current page path changes, scroll to top (fixes https://github.com/sveltejs/kit/issues/2794)
	let mounted = false;
	onMount(() => {
		mounted = true;
	});
	$: path = $page.url.pathname;
	$: path, scrollTop();
	async function scrollTop() {
		if (mounted) {
			await tick();
			document.scrollingElement.scrollTop = 0;
			window.scrollTo(0, 0);
		}
	}
</script>

<div class="layout">
	<Nav />
	<!-- A helper to resize Datawrapper Charts if needed -->
	<Datawrapper />

	{#key data.path}
		<main
			in:fly={{ y: -50, duration: 250, delay: 100 }}
			out:fly={{ y: 50, duration: 100 }}
			class="flow"
		>
			<slot />
		</main>
	{/key}

	<Footer />

	{#if data.path === '/about'}
		<Subfooter />
	{/if}
</div>
