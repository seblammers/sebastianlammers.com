<script>
	import { siteURL, siteAuthor } from '$lib/config';
	import { page } from '$app/state';
	import { dateFormat } from '$lib/assets/js/utils';
	import Heading from '$lib/components/Heading.svelte';
	import { titleFormat } from '$lib/assets/js/utils';
	import { Head } from 'svead';
	import Button from '$lib/components/ButtonSimple.svelte';
	import ButtonBack from '$lib/components/ButtonBack.svelte';
	import Embed from '$lib/components/EmbedIFrame.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import image from '$lib/assets/images/og-image.png';

	let {
		title: rawTitle = 'I forgot the title!',
		date = '1999-12-31',
		categories = undefined,
		updated = undefined,
		href = undefined,
		description = 'A sketch by Sebastian Lammers',
		children
	} = $props();
	let REPLtitle = $derived(`A Svelte REPL showing ${rawTitle}`);
	let heading = $derived(rawTitle);
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

<div class="meta">
	<time>Published: {dateFormat(date)} </time>

	{#if typeof updated !== 'undefined'}
		<time>Updated: {dateFormat(updated)}</time>
	{/if}

	{#if categories.length}
		<div class="flow tags">
			<ul class="tags">
				{#each categories as category}
					<li>
						<a class="pill" href="/sketches/categories/{category}">
							{category}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<article class="post flow">
	{@render children()}
</article>

<p>Play with the code here:</p>

<Accordion summary="Svelte REPL">
	<Embed src={href} title={REPLtitle} />
</Accordion>

<Button {href}>Open REPL in new tab</Button>

<ButtonBack href="/sketches">← Back to all Sketches</ButtonBack>

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
