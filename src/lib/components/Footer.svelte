<script>
	import { navItems, siteAuthor } from '$lib/config';
	import { navigating, page } from '$app/stores';
	import IconStroke from './svg/IconStroke.svelte';
	let width;
	$: mobile = width < 900;
</script>

<svelte:window bind:innerWidth={width} />
<footer class:mobile>
	<p>&copy; {new Date().getFullYear()} {siteAuthor}</p>

	<IconStroke stroke="#f2e9dd" />

	<p
		class="scroll-to-top"
		on:click={() => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		}}
		on:keydown={() => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		}}
	>
		Scroll to top &uarr;
	</p>
</footer>

<style lang="scss">
	.mobile {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;

		& > * {
			margin: var(--space-xs);
		}
	}
	footer {
		font-family: var(--accentFont);
		font-weight: 300;
		background: var(--ink);
		color: var(--background);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
		padding: var(--space-m) var(--space-m);
		width: 100%;

		& > * {
			flex: 0 1 auto;
		}
		p {
			margin: 0;
			font-size: var(--step-0);
		}
	}

	.scroll-to-top {
		cursor: pointer;
	}
</style>
