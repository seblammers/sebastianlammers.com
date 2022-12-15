<script>
	export let data;
	import Heading from '$lib/components/Heading.svelte';
	import Card from '$lib/components/Card.svelte';
</script>

<Heading>Posts</Heading>

<article class="flow">
	{#each data.posts as post}
		<Card {post} />
	{/each}
</article>
