<script>
	import { untrack } from 'svelte';
	import { flip } from 'svelte/animate';
	import data from './good-or-bad-data.js';
	import Switch from '$lib/components/Switch.svelte';
	import Accordion from '$lib/components/Accordion.svelte';

	let list = $state([...data]);
	let sliderValue = $state('bad');

	$effect(() => {
		// Track only sliderValue as a dependency.
		// Read list via untrack to avoid a write→read→re-run infinite loop.
		if (sliderValue === 'bad' || sliderValue === 'good') {
			list = untrack(() => [...list].reverse());
		}
	});
</script>

<div class="this-switch">
	<Switch
		bind:value={sliderValue}
		label="Which do you want first?"
		design="multi"
		options={['good', 'bad']}
	/>

	<ul>
		{#each list as d (d)}
			<li animate:flip={{ duration: 500 }} class="card">
				<Accordion summary={d.name}>
					{@html d.news}
				</Accordion>
			</li>
		{/each}
	</ul>
</div>

<style>
	ul {
		padding: 0;
	}
	li {
		list-style: none;
		height: 100%;
	}
	.this-switch {
		height: 100%;
		width: 100%;
		user-select: none; /*  went global??? */
	}

	* {
		box-sizing: border-box;
	}

	.card {
		will-change: transform, height, opacity;
		width: 100%;
	}
</style>
