<script>
	export let data;
	let projects = data.projects;
	import Heading from '$lib/components/Heading.svelte';
	import Card from '$lib/components/Card.svelte';
	import { titleFormat } from '$lib/assets/js/utils';
	import { siteURL, siteAuthor } from '$lib/config';
	import { page } from '$app/stores';
	import { Head } from 'svead';
	import image from '$lib/assets/images/og-image.png';

	let heading = 'Projects';
	let title = titleFormat(heading);
	let description = 'The project listing page of sebastianlammers.com.';
	let url = $page.url.toString;
	let authorName = siteAuthor;
	let website = siteURL;
</script>

<Head {title} {description} {image} {url} {authorName} {website} />

<Heading>{heading}</Heading>

<article class="flow">
	{#each projects as project}
		<Card post={project} />
	{/each}
</article>
