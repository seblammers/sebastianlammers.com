<script>
	import GeneralObserver from './GeneralObserver.svelte';
	let { src = '', title = '', height = '600', width = '100%', scrolling = 'yes', children, ...rest } = $props();
</script>

<GeneralObserver {height} {width}>
	<iframe {src} {width} {height} {title} {scrolling} {...rest}></iframe>
	{@render children?.()}
</GeneralObserver>
