<script>
	import * as d3 from 'd3';

	let { data, title = '', description = '' } = $props();

	const formatLabel = d3.format(',.0f');

	const xAccessor = (d) => +d.body_mass_g;
	const yAccessor = (d) => d.species;

	const margin = {
		top: 0,
		right: 160,
		bottom: 0,
		left: 0
	};

	let width = $state(400);
	const height = 500;

	let innerWidth = $derived(width - margin.left - margin.right);
	const innerHeight = height - margin.top - margin.bottom;

	let xScale = $derived(d3
		.scaleLinear()
		.domain([0, d3.max(data, xAccessor)])
		.range([0, innerWidth]));

	let yScale = $derived(d3
		.scaleBand()
		.domain(data.map((d) => d.species))
		.range([innerHeight, 0])
		.padding(0.25));

	let xAccessorScaled = $derived((d) => xScale(xAccessor(d)));
	const yAccessorScaled = (d) => yScale(yAccessor(d));
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
