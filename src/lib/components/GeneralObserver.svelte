<script>
	import viewport from '$lib/assets/js/use-viewport-action.js';

	let { height = '100', width = '100', children } = $props();
	let intersecting = $state(false);
</script>

<div
	use:viewport
	onenterViewport={() => {
		intersecting = true;
	}}
>
	{#if intersecting}
		<div class="flex-center" style={`width: ${width}`}>
			{@render children()}
		</div>
	{:else}
		<div class="flex-center" style={`height:${height}px;width: 100%`}></div>
	{/if}
</div>
