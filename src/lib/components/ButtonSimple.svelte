<script>
	// href needs to be provided as prop
	export let href = '';
</script>

<a class="button-simple right" {href} target="_blank" rel="noopener noreferrer">
	<!-- Button label is provided in the slot / prefilled with this: -->
	<slot>Explore this project ↗</slot>
</a>

<style>
	.right {
		float: right;
	}
</style>
