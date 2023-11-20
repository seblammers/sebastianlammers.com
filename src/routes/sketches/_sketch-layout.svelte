<script>
	import { siteURL, siteAuthor } from '$lib/config';
	import { page } from '$app/stores';
	import { dateFormat } from '$lib/assets/js/utils';
	import Heading from '$lib/components/Heading.svelte';
	import { titleFormat } from '$lib/assets/js/utils';
	import { Head } from 'svead';
	import Button from '$lib/components/ButtonSimple.svelte';
	import Embed from '$lib/components/EmbedIFrame.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import image from '$lib/assets/images/og-image.png';

	export let title = 'I forgot the title!';
	export let date = '1999-12-31';
	export let categories = undefined;
	export let updated = undefined;
	export let href = undefined;
	let REPLtitle = `A Svelte REPL showing ${title}`;
	export let description = 'A sketch by Sebastian Lammers';
	let heading = title;
	title = titleFormat(title);
	let url = $page.url.toString;
	let authorName = siteAuthor;
	let website = siteURL;
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
	<slot />
</article>

<p>Play with the code here:</p>

<Accordion summary="Svelte REPL">
	<Embed src={href} title={REPLtitle} />
</Accordion>

<Button {href}>Open REPL in new tab</Button>

<style lang="scss">
	.meta {
		font-family: var(--accentFont);
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
