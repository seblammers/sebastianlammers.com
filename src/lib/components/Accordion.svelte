<script>
	// if custom summary is not provided, fall back on "Show me the code"
	// which is probably the most frequent use-case
	let { summary: summaryText = 'Show me the code', children } = $props();
</script>

<details class="accordion">
	<summary>
		<b>{summaryText}</b>
	</summary>

	<div class="details flow">
		{@render children()}
	</div>
</details>

<style>
	details {
		--flow-space: var(--space-m);
		border: var(--radius) solid var(--accent);
		border-radius: var(--radius);
		border-radius: var(--radiusSection);

		padding: var(--space-s);
		margin: var(--space-xs) 0;
		max-width: var(--max-width);
		border-style: none none none solid;
		background-color: var(--surface2-light);
		font-family: var(--sansFont);
	}

	/* # The Rotating Marker # */
	/* hattip https://codepen.io/redesigned/pen/wvoEvqG */
	summary {
		display: block;
		position: relative;
		cursor: pointer;
		padding: 1rem 2rem;
		padding-left: 2.9rem;
	}

	/* # The Rotating Marker # */
	details summary::-webkit-details-marker {
		display: none;
	}

	summary::before {
		content: '▶';
		position: absolute;
		top: 1rem;
		left: 0.8rem;
		transform: rotate(0);
		transform-origin: center;
		transition: 0.25s transform ease;
	}

	details[open] > summary:before {
		transform: rotate(90deg);
		transition: 0.25s transform ease;
	}
</style>
