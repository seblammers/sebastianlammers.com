<script>
	import viewport from '$lib/assets/js/use-viewport-action.js';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let height = '100';
	export let width = '100';
	let intersecting;
</script>

<div
	use:viewport
	on:enterViewport={() => {
		intersecting = true;
		dispatch('enterViewport');
	}}
>
	{#if intersecting}
		<div class="flex-center" style={`width: ${width}`}>
			<slot />
		</div>
	{:else}
		<div class="flex-center" style={`height:${height}px;width: 100%`} />
	{/if}
</div>
