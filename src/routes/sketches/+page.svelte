<script>
	export let data;
	let sketches = data.sketches;
	let tags = data.tags;
	import Heading from '$lib/components/Heading.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import Card from '$lib/components/Card.svelte';
	import { titleFormat } from '$lib/assets/js/utils';
	import { siteURL, siteAuthor } from '$lib/config';
	import { page } from '$app/stores';
	import { Head } from 'svead';
	import image from '$lib/assets/images/sketches/og-image_sketches.png';

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
	and scrollytelling.<br />
	If you want to narrow down what type of sketches are listed, you can use the tags below.
</p>

<Accordion summary="Show all tags">
	<div class="flow tags">
		<ul class="tags">
			{#each tags as tag}
				<li>
					<a class="pill" href="/sketches/categories/{tag}">
						{tag}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</Accordion>

<article class="flow">
	{#each sketches as sketch}
		<Card post={sketch} />
	{/each}
</article>

<style>
	.tags {
		font-style: normal;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: var(--space-2xs);
		margin: 0;
	}
	ul {
		list-style-type: none;
		list-style: none;
		padding-left: 0%;
	}
</style>
