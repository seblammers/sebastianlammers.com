<script>
	import * as d3 from 'd3';

	export let data;
	export let title = '';
	export let description = '';

	const formatLabel = d3.format(',.0f');

	const xAccessor = (d) => +d.body_mass_g;
	const yAccessor = (d) => d.species;

	const margin = {
		top: 0,
		right: 160,
		bottom: 0,
		left: 0
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
	<h4 class="no-hover">{title}</h4>
	<svg class="chart" {width} {height} role="figure" tabindex="0">
		<title>{description}</title>
		<g
			transform={`translate(${margin.left}, ${margin.top})`}
			tabindex="0"
			role="list"
			aria-label="bar chart bars"
		>
			{#each data as d}
				<g
					role="listitem"
					tabindex="0"
					aria-label="The heaviest penguin of the {yAccessor(d)} species weighed {xAccessor(
						d
					)} grams."
				>
					<rect
						x={0}
						y={yAccessorScaled(d)}
						width={xAccessorScaled(d)}
						height={yScale.bandwidth()}
					/>
					<text
						text-anchor="start"
						x={10}
						y={yAccessorScaled(d) + yScale.bandwidth() / 2}
						dy=".32em"
						fill={'var(--surface2-light)'}
					>
						{yAccessor(d)}
					</text>
					<text
						text-anchor="start"
						x={xAccessorScaled(d)}
						dx="10"
						y={yAccessorScaled(d) + yScale.bandwidth() / 2}
						dy=".32em"
					>
						{formatLabel(d.body_mass_g)} g
					</text>
				</g>
			{/each}
		</g>
	</svg>
</div>

<style lang="scss">
	rect {
		fill: var(--ink);
	}

	text {
		font-family: var(--codeFont);
	}
</style>
