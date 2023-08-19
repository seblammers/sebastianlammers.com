<script>
	// href needs to be provided as prop
	export let href = '';
</script>

<a class="button-simple" {href} target="_blank" rel="noopener noreferrer">
	<!-- Button label is provided in the slot / prefilled with this: -->
	<slot>Explore the project</slot>
</a>
