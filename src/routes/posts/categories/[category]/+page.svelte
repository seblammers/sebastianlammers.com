<script>
	import Card from '$lib/components/Card.svelte';
	import Meta from '$lib/components/Meta.svelte';
	export let data;
	let { posts, category } = data;
</script>

<Meta />

{#if posts.length}
	<article class="flow">
		<h1>Content filed under "{category}"</h1>
		{#each posts as post}
			<Card {post} />
		{/each}
	</article>
{:else}
	<h1>Whoops!</h1>
	<p>Sorry, couldn't find any content filed under "{category}".</p>

	<p><a href="/posts">Back to Posts</a></p>
{/if}
