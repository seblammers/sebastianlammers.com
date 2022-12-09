<script>
	import { siteURL, siteAuthor } from '$lib/config';
	import { page } from '$app/stores';
	import { dateFormat } from '$lib/assets/js/utils';
	import Readotron from '$lib/components/Readotron.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { Head } from 'svead';
	export let title;
	export let date;
	export let categories;
	export let updated;
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

<div class="meta">
	<time>Published: {dateFormat(date)} </time>

	{#if typeof updated !== 'undefined'}
		<time>Updated: {dateFormat(updated)}</time>
	{/if}

	<Readotron
		selector=".post"
		template={(time) => `Reading Time: ${time} ${time > 1 ? 'minutes' : 'minute'}`}
	/>

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

<article class="post flow">
	<slot />
</article>

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
