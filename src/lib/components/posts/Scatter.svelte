<script>
	let data = [
		{ x: 10.0, y: 8.04 },
		{ x: 8.0, y: 6.95 },
		{ x: 13.0, y: 7.58 },
		{ x: 9.0, y: 8.81 },
		{ x: 11.0, y: 8.33 },
		{ x: 14.0, y: 9.96 },
		{ x: 6.0, y: 7.24 },
		{ x: 4.0, y: 4.26 },
		{ x: 12.0, y: 10.84 },
		{ x: 7.0, y: 4.82 },
		{ x: 5.0, y: 5.68 }
	];

	import { scaleLinear } from 'd3-scale';

	let width = $state();
	let height = $state();

	const margin = { top: 30, bottom: 30, left: 30, right: 30 };

	let xScale = $derived(
		scaleLinear()
			.domain([1, 18])
			.range([margin.left, width - margin.right])
	);

	let yScale = $derived(
		scaleLinear()
			.domain([1, 18])
			.range([height - margin.top, margin.bottom])
	);

	let xTicks = $derived(xScale.ticks());
	let yTicks = $derived(yScale.ticks());
</script>

<div class="chart-container" bind:offsetWidth={width} bind:offsetHeight={height}>
	<svg
		viewBox="0 0 {width + margin.right + margin.left} {height}"
		width={width + margin.right + margin.left}
		{height}
	>
		<g class="axis x-axis">
			{#each xTicks as tick}
				<g transform={`translate(${xScale(tick)} ${height - 20})`}>
					<line y1="-5" y2="0" stroke="black" />
					<text y="20" text-anchor="middle">{tick}</text>
				</g>
			{/each}

			<line class="baseline" y1={height - 23} y2={height - 23} x1="33" x2={width}></line>
		</g>

		<g class="axis y-axis">
			{#each yTicks as tick}
				<g transform={`translate(0 ${yScale(tick)})`}>
					<line x1="35" x2="40" stroke="black" />
					<text x="30" dominant-baseline="middle" text-anchor="end">{tick}</text>
				</g>
			{/each}
			<line class="baseline" y1={height - 23} y2={1 - height} x1="33" x2="33"></line>
		</g>

		{#each data as d}
			<circle cx={xScale(d.x)} cy={yScale(d.y)} r={15} fill="orange" stroke="#000" opacity=".9" />
		{/each}
	</svg>
</div>

<style>
	line {
		stroke: var(--default);
		stroke-dasharray: 2;
		stroke-opacity: 0.33;
	}

	.baseline {
		stroke-dasharray: 0;
		stroke: black;
		stroke-opacity: 0.5;
	}

	.chart-container {
		height: 50vh;
		/* max-width: 100%; */
		min-width: 800px;
		max-width: 1200px;
		min-height: 500px;
		background: white;
		border-radius: 5px;
		box-shadow: 1px 1px 6px #ddd;
		font-family: 'Noto Sans', Tahoma, Geneva, Verdana, sans-serif;
	}
</style>
