<script>
	import * as d3 from 'd3';

	export let data;
	export let title = '';

	const formatLabel = d3.format(',.0f');

	const xAccessor = (d) => +d.body_mass_g;
	const yAccessor = (d) => d.species;

	const margin = {
		top: 0,
		right: 110,
		bottom: 0,
		left: 180
	};

	let width = 400;
	let height = 500;

	$: innerWidth = width - margin.left - margin.right;
	let innerHeight = height - margin.top - margin.bottom;

	$: xScale = d3
		.scaleLinear()
		.domain([0, d3.max(data, xAccessor)])
		.range([0, innerWidth]);

	const yScale = d3
		.scaleBand()
		.domain(data.map((d) => d.species))
		.range([innerHeight, 0])
		.padding(0.25);

	$: xAccessorScaled = (d) => xScale(xAccessor(d));
	$: yAccessorScaled = (d) => yScale(yAccessor(d));
</script>

<div class="chart-wrapper" bind:clientWidth={width}>
	<h4>{title}</h4>
	<svg class="chart" {width} {height}>
		<g transform={`translate(${margin.left}, ${margin.top})`}>
			{#each data as d}
				<text text-anchor="end" x={-10} y={yAccessorScaled(d) + yScale.bandwidth() / 2} dy=".32em">
					{yAccessor(d)}
				</text>
				<rect x={0} y={yAccessorScaled(d)} width={xAccessorScaled(d)} height={yScale.bandwidth()} />
				<text
					text-anchor="start"
					x={xAccessorScaled(d)}
					dx="10"
					y={yAccessorScaled(d) + yScale.bandwidth() / 2}
					dy=".32em"
				>
					{formatLabel(d.body_mass_g)}
				</text>
			{/each}
		</g>
	</svg>
</div>

<style lang="scss">
	.chart-wrapper {
		position: relative;
		width: 100%;
		max-width: 60ch;
		// border: solid;
		/* background-color: var(--surface2-light); */
	}
	rect {
		fill: var(--ink);
	}

	text {
		font-family: var(--codeFont);
	}

	h4:hover {
		cursor: auto;
		--_p: 0%;
	}
</style>
