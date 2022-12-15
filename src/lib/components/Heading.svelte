<script>
	import { fly } from 'svelte/transition';
</script>

<!-- <h1 in:fly={{ x: -200, duration: 800, delay: 150 }} > -->
<h1>
	<slot />
</h1>

<style>
	h1 {
		margin-bottom: 1%;
	}
</style>
