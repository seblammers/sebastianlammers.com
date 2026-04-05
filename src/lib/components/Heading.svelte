<script>
	let { children } = $props();
</script>

<h1>
	{@render children()}
</h1>

<style>
	h1 {
		margin-bottom: 1%;
	}
</style>
