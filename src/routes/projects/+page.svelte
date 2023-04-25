<script>
	export let data;
	let projects = data.projects;
	import Heading from '$lib/components/Heading.svelte';
	import Card from '$lib/components/Card.svelte';
	import { titleFormat } from '$lib/assets/js/utils';
	import { siteURL, siteAuthor } from '$lib/config';
	import { page } from '$app/stores';
	import { Head } from 'svead';
	let heading = 'Projects';
	let title = titleFormat(heading);
	let description =
		'The project listing page of sebastianlammers.com, my personal homepage, where I play with code and share some notes and projects.';
	let url = $page.url.toString;
	let authorName = siteAuthor;
	let website = siteURL;
	let image = `https://ik.imagekit.io/seblammers/tr:otf-Inter-SemiBold_zoEu2Lj-l.otf,ot-${title},ots-72,otc-FFF,ox-10,oy-20,otw-700/twittercard_-1cx8-LQN.png`;

	import preview from '$lib/assets/images/projects/awesome-svelte-and-d3/screenshot-am-I-responsive.png';
</script>

<Head {title} {description} {image} {url} {authorName} {website} />

<Heading>{heading}</Heading>

<article class="flow">
	{#each projects as project}
		<Card post={project} image={preview} />
	{/each}
</article>
