<script>
	export let inner_left = -15;
	export let inner_right = 15;
	export let outer_left = -45;
	export let outer_right = 45;
	export let inner_bottom = 26.25;
	export let inner_top = -26.25;
	export let outer_bottom = 8.75;
	export let outer_top = -8.75;
</script>

<svg
	width="130mm"
	height="105mm"
	version="1.1"
	viewBox="0 0 130 105"
	xml:space="preserve"
	xmlns="http://www.w3.org/2000/svg"
>
	<g>
		<!-- each path has a tranform applied to it that uses the x and y values supplied by the tweened store-->
		<path
			transform="translate({inner_left} {inner_bottom})"
			d="m 49.8445,28.75 v 30 l 30.311,17.5 v -30 z"
			fill="#1b4e97"
			fill-opacity="0.98431"
			id="path1"
		/>
		<path
			transform="translate({inner_right} {inner_bottom})"
			d="m 80.1555,28.75 -30.311,17.5 v 30 l 30.311,-17.5 v -15 z"
			fill="#93cbc3"
			fill-opacity="0.82353"
			id="path2"
		/>
		<path
			transform="translate({outer_left} {outer_bottom})"
			d="m 49.8445,28.75 v 30 l 30.311,17.5 v -30 z"
			fill="#f9ae5d"
			fill-opacity="0.87451"
			id="path3"
		/>
		<path
			transform="translate({outer_right} {outer_bottom})"
			d="m 80.1555,28.75 -30.311,17.5 v 30 l 30.311,-17.5 v -15 z"
			fill="#fa5205"
			fill-opacity="0.85882"
			id="path4"
		/>
		<path
			transform="translate({outer_left} {outer_top})"
			d="m 80.1555,28.75 -30.311,17.5 v 30 l 30.311,-17.5 v -15 z"
			fill="#02439d"
			fill-opacity="0.88235"
			id="path5"
		/>
		<path
			transform="translate({outer_right} {outer_top})"
			d="m 49.8445,28.75 v 30 l 30.311,17.5 v -30 z"
			fill="#93cac3"
			fill-opacity="0.82353"
			id="path6"
		/>
		<path
			transform="translate({inner_right} {outer_bottom})"
			d="m 49.8445,28.75 v 30 l 30.311,17.5 v -30 z"
			fill="#f9ae5d"
			fill-opacity="0.87451"
			id="path7"
		/>
		<path
			transform="translate({inner_left} {outer_bottom})"
			d="m 80.1555,28.75 -30.311,17.5 v 30 l 30.311,-17.5 v -15 z"
			fill="#fa5205"
			fill-opacity="0.85882"
			id="path8"
		/>
		<path
			transform="translate({inner_right} {outer_top})"
			d="m 80.1555,28.75 -30.311,17.5 v 30 l 30.311,-17.5 v -15 z"
			fill="#02439d"
			fill-opacity="0.88235"
			id="path9"
		/>
		<path
			transform="translate({inner_left} {outer_top})"
			d="m 49.8445,28.75 v 30 l 30.311,17.5 v -30 z"
			fill="#93cac3"
			fill-opacity="0.82353"
			id="path10"
		/>
		<path
			transform="translate({inner_left} {inner_top})"
			d="m 80.1555,28.75 -30.311,17.5 v 30 l 30.311,-17.5 v -15 z"
			fill="#f9ae5d"
			fill-opacity="0.87255"
			id="path11"
		/>
		<path
			transform="translate({inner_right} {inner_top})"
			d="m 49.8445,28.75 v 30 l 30.311,17.5 v -30 z"
			fill="#fa5205"
			fill-opacity="0.85787"
			id="path12"
		/>
	</g>
</svg>
