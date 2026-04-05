<script>
	import { siteURL, siteAuthor } from '$lib/config';
	import { page } from '$app/state';
	import { dateFormat } from '$lib/assets/js/utils';
	import { onMount } from 'svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { titleFormat } from '$lib/assets/js/utils';
	import { Head } from 'svead';
	import image from '$lib/assets/images/og-image.png';

	// draft, data, form are passed from SvelteKit/mdsvex but not used in this template
	let {
		title: rawTitle = 'I forgot the title!',
		date = '1999-12-31',
		categories = undefined,
		updated = undefined,
		description = 'A post by Sebastian Lammers',
		children
	} = $props();
	let heading = $derived(rawTitle);
	let title = $derived(titleFormat(rawTitle));
	let url = page.url.href;
	let authorName = siteAuthor;
	let website = siteURL;

	// setting up reading-time variables
	let article = $state();
	let time = $state();
	// function to estimate reading time
	// https://dev.to/michaelburrows/calculate-the-estimated-reading-time-of-an-article-using-javascript-2k9l
	function getReadingTime() {
		let text = article.innerText;
		let wpm = 225;
		let words = text.trim().split(/\s+/).length;
		return Math.ceil(words / wpm);
	}

	// read on mount
	onMount(() => {
		time = getReadingTime();
	});
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

<div class="meta">
	<time>Published: {dateFormat(date)} </time>

	{#if typeof updated !== 'undefined'}
		<time>Updated: {dateFormat(updated)}</time>
	{/if}

	<div class="readingTime">
		{#if typeof time !== 'undefined'}
			{`Reading Time: ${time} ${time > 1 ? 'minutes' : 'minute'}`}
		{:else}
			Reading Time: is being estimated...
		{/if}
	</div>
	{#if categories.length}
		<div class="flow tags">
			<ul class="tags">
				{#each categories as category}
					<li>
						<a class="pill" href="/posts/categories/{category}">
							{category}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<article class="post flow" bind:this={article}>
	{@render children()}
</article>

<style lang="scss">
	.meta {
		font-family: var(--sansFont);
		color: var(--text2-light);
		font-style: italic;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		margin: 0;
		gap: var(--space-2xs);
		font-size: var(--step-0);
	}

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
