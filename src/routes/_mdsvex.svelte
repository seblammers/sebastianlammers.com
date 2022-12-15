<script>
	import { siteURL, siteAuthor } from '$lib/config';
	import { page } from '$app/stores';
	import Heading from '$lib/components/Heading.svelte';
	import { Head } from 'svead';
	export let title;
	export let description;
	let url = $page.url.toString;
	let authorName = siteAuthor;
	let website = siteURL;
	let image = `https://ik.imagekit.io/seblammers/tr:otf-Inter-SemiBold_zoEu2Lj-l.otf,ot-${title},ots-72,otc-FFF,ox-10,oy-20,otw-700/twittercard_-1cx8-LQN.png`;
</script>

<Head {title} {description} {image} {url} {authorName} {website} />

<Heading>
	{title}
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
