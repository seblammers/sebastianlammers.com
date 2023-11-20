<script>
	// part of the making of Stories from the night sky:
	// https://storiesfromthenightsky.netlify.app/
	// by Sebastian https://vis.social/@seblammers
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import Shape from './ColoursNightSkyShape.svelte';

	// initial position for all elements
	// x-axis
	let x = [15, -15];
	// y-axis
	let y = [26.25, -26.25, 8.75, -8.75];

	// prepare two tweened arrays
	// 1) for the X-axis
	const tweenedX = tweened(x, {
		easing: cubicInOut,
		duration: 800
	});

	// 2) for the Y-axis
	const tweenedY = tweened(y, {
		easing: cubicInOut,
		duration: 800
	});

	// keep track of clicking
	let clicked = false;

	// handle clicking
	function handleClick() {
		clicked = !clicked;
	}

	// to shuffle the order of x and y-coordinates
	// we use a Fisher–Yates shuffle
	// h/t Mike Bostock: https://bost.ocks.org/mike/shuffle/compare.html
	function shuffle(array) {
		var m = array.length,
			t,
			i;
		while (m) {
			i = Math.floor(Math.random() * m--);
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}
		return array;
	}

	// if the SVG is being clicked, tween between the intial
	// values and the final values
	// a click will shift the elements to randomized positions
	// next click will gather them in central position again
	// (new click will randomize again)
	$: {
		if (clicked) {
			tweenedX.set(shuffle(x));
			tweenedY.set(shuffle(y));
		} else {
			// handle the "second click" to shift to origin
			// I wonder why I can not have "x" here? the tweening stops working:
			// tweenedX.set(x); // does not work
			tweenedX.set([-15, 15]);
			tweenedY.set([26.25, -26.25, 8.75, -8.75]);
		}
	}

	function handleKeyDown(e) {
		if (e.key === 'Enter') handleClick();
	}
</script>

<!--We use a wrapper around our SVG to detect clicking to simplify things -->
<div
	class="wrapper"
	on:click|preventDefault={handleClick}
	on:keydown|preventDefault={handleKeyDown}
>
	<Shape
		inner_left={$tweenedX[0]}
		inner_right={$tweenedX[1]}
		inner_top={$tweenedY[1]}
		outer_top={$tweenedY[3]}
	/>
</div>

<style>
	* {
		max-width: 60ch;
	}
	.wrapper {
		margin: 3rem;
		display: flex;
		justify-content: center;
		cursor: pointer;
	}
</style>
