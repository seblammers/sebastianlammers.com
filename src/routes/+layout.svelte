<script>
	import { fly } from 'svelte/transition';
	import Nav from '$lib/components/Nav.svelte';
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
</script>

<div class="layout">
	<Nav />

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
