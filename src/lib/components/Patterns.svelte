<script>
	// Define the number of circles to display on each side
	export let numCircles = 15;
	export let side = 'left';
	export let radius = 50;
	export let fill = 'white';

	let sideClass = `${side}-circle`;

	let randomNumbers = Array.from({ length: numCircles }, () => ({
		i: Math.floor(Math.random() * 1900)
	}));

	// Define an array of random X and Y coordinates for the circles on the left side
	const Circles = Array.from({ length: numCircles }, (x, i) => ({
		x: Math.floor(Math.random() * 400) + i,
		y: Math.floor(Math.random() * 800) + i * 2
	}));

	console.log(Circles);
</script>

<div class="background">
	<svg class={sideClass} width="25%" height="300%">
		<g style="transform: translate(10%, 10%);">
			{#each Circles as circle}
				<circle cx={circle.x} cy={circle.y} r={radius} {fill} />
			{/each}
		</g>
	</svg>
</div>

<style>
	.background {
		z-index: -99;
		height: 300%;
	}
	.left-circle {
		position: absolute;
		left: 0;
		top: 0;
	}

	.right-circle {
		position: absolute;
		right: 0;
		top: 0;
	}
</style>
