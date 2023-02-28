<script>
	import PatternShuffle from '$lib/components/PatternShuffle.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let steps = [
		{ color: '#000333', fontColor: 'white', text: '' },
		{ color: '#291841', fontColor: 'white', text: 'Hey!' },
		{ color: '#4a2a4e', fontColor: 'white', text: 'Stop!' },
		{ color: '#683f5a', fontColor: 'white', text: "Where do you think you're going?" },
		{ color: '#835768', fontColor: 'white', text: 'Oh well...' },
		{ color: '#9c7178', fontColor: 'black', text: "I guess you're one of the curious folks." },
		{ color: '#b28d8b', fontColor: 'black', text: 'Well, I better show you something nice then.' },
		{ color: '#c7aba1', fontColor: 'black', text: 'If you can make it to the bottom...' },
		{ color: '#dcc9bc', fontColor: 'black', text: 'Ok, ok, you made it!' },
		{ color: '#f1e7da', fontColor: 'black', text: 'There you go...' }
	];
</script>

<section class="snap">
	{#each steps as { color, fontColor, text }, i}
		<div class="step" style="--color: {color}; --fontColor: {fontColor}">
			{text}
		</div>
	{/each}
</section>

<PatternShuffle />

<Footer />

<style lang="scss">
	.step {
		min-height: 90vh;
		background: var(--color);
		color: var(--fontColor);
		font-size: var(--step-3);
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
</style>
