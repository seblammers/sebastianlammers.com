<script>
	export let data;
	import Heading from '$lib/components/Heading.svelte';
	import Card from '$lib/components/Card.svelte';
	import { titleFormat } from '$lib/assets/js/utils';
	import { siteURL, siteAuthor } from '$lib/config';
	import { page } from '$app/stores';
	import { Head } from 'svead';
	let heading = 'Posts';
	let title = titleFormat(heading);
	let description =
		'The post listing page of sebastianlammers.com, my personal homepage, where I play with code and share some notes and projects.';
	let url = $page.url.toString;
	let authorName = siteAuthor;
	let website = siteURL;
	let image = `https://ik.imagekit.io/seblammers/tr:otf-Inter-SemiBold_zoEu2Lj-l.otf,ot-${title},ots-72,otc-FFF,ox-10,oy-20,otw-700/twittercard_-1cx8-LQN.png`;
</script>

<Head {title} {description} {image} {url} {authorName} {website} />

<Heading>{heading}</Heading>

<article class="flow">
	{#each data.posts as post}
		<Card {post} />
	{/each}
</article>
