<script>
	import { siteURL, siteAuthor } from '$lib/config';
	import { page } from '$app/stores';
	import Heading from '$lib/components/Heading.svelte';
	import { titleFormat } from '$lib/assets/js/utils';
	import { Head } from 'svead';
	import image from '$lib/assets/images/og-image.png';
	export let title;
	export let description;
	// preserve heading title
	let heading = title;
	// append " | Sebastian Lammers" for SEO and the tab-title
	title = titleFormat(title);
	let url = $page.url.toString;
	let authorName = siteAuthor;
	let website = siteURL;
</script>

<Head {title} {description} {image} {url} {authorName} {website} />

<Heading>
	{heading}
</Heading>

<article class="post flow">
	<slot />
</article>

<style lang="scss">
	ul {
		list-style-type: none;
		list-style: none;
		padding-left: 0%;
	}
</style>
