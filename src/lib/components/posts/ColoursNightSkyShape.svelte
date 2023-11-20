<script>
	export let inner_left = -15;
	export let inner_right = 15;
	export let inner_top = -26.25;
	export let outer_top = -8.75;
	export let opacity = 1;
</script>

<svg
	width="130mm"
	height="105mm"
	version="1.1"
	viewBox="0 0 130 105"
	xml:space="preserve"
	xmlns="http://www.w3.org/2000/svg"
>
	<g fill-opacity={opacity}>
		<!-- each path has a tranform applied to it that uses the x and y values supplied by the tweened store-->
		<path
			transform="translate({inner_right} {outer_top})"
			d="m 80.1555,28.75 -30.311,17.5 v 30 l 30.311,-17.5 v -15 z"
			fill="hsl(238, 80%, 6%)"
			id="dark blue"
		/>
		<path
			transform="translate({inner_left} {outer_top})"
			d="m 49.8445,28.75 v 30 l 30.311,17.5 v -30 z"
			fill="hsl(238, 80%, 96%)"
			id="light medium"
		/>
		<path
			transform="translate({inner_left} {inner_top})"
			d="m 80.1555,28.75 -30.311,17.5 v 30 l 30.311,-17.5 v -15 z"
			fill="hsl(238, 80%, 66%)"
			id="purple"
		/>
		<path
			transform="translate({inner_right} {inner_top})"
			d="m 49.8445,28.75 v 30 l 30.311,17.5 v -30 z"
			fill="hsl(238, 98%, 98%)"
			id="light bright"
		/>
	</g>
</svg>

<style>
	svg {
		background-color: white;
	}
</style>
