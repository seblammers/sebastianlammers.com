<script>
	// inspired by
	// https://utopia.fyi/grid
	// and
	// https://codepen.io/andy-set-studio/pen/YzXrdwR
	let data = [
		{
			title: 'Dark Blue',
			text: 'Background color',
			background: 'hsl(238, 80%, 6%)',
			color: 'hsl(238, 80%, 96%)'
		},
		{
			title: 'Purple',
			text: 'Accent color',
			background: 'hsl(238, 80%, 66%)',
			color: 'hsl(238, 80%, 96%)'
		},
		{
			title: 'Light Medium',
			text: 'Fonts',
			background: 'hsl(238, 80%, 96%)',
			color: 'hsl(238, 80%, 6%)'
		},
		{
			title: 'Light Bright',
			text: 'Tooltip Background',
			background: 'hsl(238, 98%, 98%)',
			color: 'hsl(238, 80%, 6%)'
		}
	];
</script>

<section class="u-container">
	<div class="u-grid">
		{#each data as d}
			<div class="card" style="background:{d.background}; color: {d.color}">
				<strong>
					{d.title}
				</strong>
				<ul>
					<li>{d.text}</li>
					<li>{d.background}</li>
				</ul>
			</div>
		{/each}
	</div>
</section>

<style>
	:root {
		--auto-grid-min-size: 16rem;
		--grid-max-width: 77.5rem;
		--grid-gutter: var(--space-s-l);
		--grid-columns: 12;
	}

	.u-container {
		max-width: var(--grid-max-width);
		padding-inline: var(--grid-gutter);
		margin-inline: auto;
	}

	.u-grid {
		display: grid;
		gap: var(--grid-gutter);
		grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size, 16rem), 1fr));
	}

	.card {
		border-radius: var(--radiusSection);
		border: var(--radius) solid currentColor;
		padding: var(--space-xs);
	}

	.card > ul li::marker {
		color: currentColor;
	}
</style>
