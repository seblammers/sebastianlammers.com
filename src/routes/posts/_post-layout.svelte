<script>
	import { siteURL, siteAuthor } from '$lib/config';
	import { page } from '$app/stores';
	import { dateFormat } from '$lib/assets/js/utils';
	import { onMount } from 'svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { titleFormat } from '$lib/assets/js/utils';
	import { Head } from 'svead';
	import image from '$lib/assets/images/og-image.png';

	export let title = 'I forgot the title!';
	export let date = '1999-12-31';
	export let categories = undefined;
	export let updated = undefined;
	export let description = 'A post by Sebastian Lammers';
	export let draft = true;
	export let data;
	export let form;
	let heading = title;
	title = titleFormat(title);
	let url = $page.url.toString;
	let authorName = siteAuthor;
	let website = siteURL;

	// setting up reading-time variables
	let article;
	let time;
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

<Head {title} {description} {image} {url} {authorName} {website} />

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
	<slot />
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
