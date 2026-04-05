<script>
	import Heading from '$lib/components/Heading.svelte';
	import Card from '$lib/components/Card.svelte';
	import { titleFormat } from '$lib/assets/js/utils';
	import { siteURL, siteAuthor } from '$lib/config';
	import { page } from '$app/state';
	import { Head } from 'svead';
	import image from '$lib/assets/images/og-image.png';

	let { data } = $props();
	let heading = 'Posts';
	let title = titleFormat(heading);
	let description = 'The post listing page of sebastianlammers.com';
	let url = page.url.href;
	let authorName = siteAuthor;
	let website = siteURL;
</script>

<Head seo_config={{ title, description, url, open_graph_image: image, author_name: authorName, website }} />

<Heading>{heading}</Heading>

<article class="flow">
	{#each data.posts as post}
		<Card {post} />
	{/each}
</article>
