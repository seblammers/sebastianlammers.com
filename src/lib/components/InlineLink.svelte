<script>
	let { url, children } = $props();
</script>

<a href={url} target="blank" rel="noopener noreferrer">
	{@render children()} &nearr;
</a>
