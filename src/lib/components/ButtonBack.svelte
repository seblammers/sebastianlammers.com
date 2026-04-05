<script>
	// href needs to be provided as prop
	let { href = '/projects', children } = $props();
</script>

<a class="button-simple" {href}>
	<!-- Button label is provided in the slot / prefilled with this: -->
	{#if children}
		{@render children()}
	{:else}
		← Back to all projects
	{/if}
</a>
