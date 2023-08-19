<script>
	// href needs to be provided as prop
	export let href = '/projects';
</script>

<a class="button-simple" {href}>
	<!-- Button label is provided in the slot / prefilled with this: -->
	<slot>← Back to all projects</slot>
</a>
