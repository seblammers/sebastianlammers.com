<script>
	import GeneralObserver from './GeneralObserver.svelte';
	export let src = '';
	export let title = '';
	export let height = '600';
	export let width = '100%';
	export let scrolling = 'yes';
</script>

<GeneralObserver {height} {width}>
	<iframe {src} {width} {height} {title} {scrolling} {...$$restProps} />
	<slot />
</GeneralObserver>
