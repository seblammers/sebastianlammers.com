<script>
	import Card from '$lib/components/Card.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import Button from '$lib/components/ButtonBack.svelte';
	export let data;

	let heading =
		data.sketches.length > 1
			? `${data.sketches.length} Sketches filed under "${data.category}"`
			: `1 Sketch filed under "${data.category}"`;
</script>

<Meta />

{#if data.sketches.length}
	<article class="flow">
		<h1>{heading}</h1>
		{#each data.sketches as sketch}
			<Card post={sketch} />
		{/each}
	</article>
{:else}
	<h1>Whoops!</h1>
	<p>Sorry, couldn't find any sketches filed under "{data.category}".</p>

	<Button href="/sketches">← Back to all Sketches</Button>
{/if}
