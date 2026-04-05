<script>
	import { siteURL, siteAuthor } from '$lib/config';
	import { page } from '$app/state';
	import Heading from '$lib/components/Heading.svelte';
	import { titleFormat } from '$lib/assets/js/utils';
	import { Head } from 'svead';
	import image from '$lib/assets/images/og-image.png';

	let { title: rawTitle, description, children } = $props();
	// preserve heading title
	let heading = $derived(rawTitle);
	// append " | Sebastian Lammers" for SEO and the tab-title
	let title = $derived(titleFormat(rawTitle));
	let url = page.url.href;
	let authorName = siteAuthor;
	let website = siteURL;
</script>

<Head
	seo_config={{
		title,
		description,
		url,
		open_graph_image: image,
		author_name: authorName,
		website
	}}
/>

<Heading>
	{heading}
</Heading>

<article class="post flow">
	{@render children()}
</article>
