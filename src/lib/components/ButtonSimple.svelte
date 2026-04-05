<script>
	// href needs to be provided as prop
	let { href = '', children } = $props();
</script>

<a class="button-simple right" {href} target="_blank" rel="noopener noreferrer">
	<!-- Button label is provided in the slot / prefilled with this: -->
	{#if children}
		{@render children()}
	{:else}
		Explore this project
	{/if}
</a>

<style>
	.right {
		float: right;
	}
</style>
