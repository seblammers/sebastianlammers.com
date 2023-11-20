<script>
	export let data;
	let sketches = data.sketches;
	import Heading from '$lib/components/Heading.svelte';
	import Card from '$lib/components/Card.svelte';
	import { titleFormat } from '$lib/assets/js/utils';
	import { siteURL, siteAuthor } from '$lib/config';
	import { page } from '$app/stores';
	import { Head } from 'svead';
	import image from '$lib/assets/images/og-image.png';

	let heading = 'Sketches';
	let title = titleFormat(heading);
	let description = 'The sketch listing page of sebastianlammers.com.';
	let url = $page.url.toString;
	let authorName = siteAuthor;
	let website = siteURL;
</script>

<Head {title} {description} {image} {url} {authorName} {website} />

<Heading>{heading}</Heading>

<p>
	This is an ongoing collection of some data visualizations and related patterns that I created with
	Svelte, D3, SVG and friends. It's mostly chart types that I wanted to implement with Svelte & D3
	without committing to a full-blown project. But there are also some experiments around animation
	and scrollytelling.
</p>
<p><i>This section is currently work in progress. Things might not look perfect :)</i></p>
<article class="flow">
	{#each sketches as sketch}
		<Card post={sketch} />
	{/each}
</article>
