<script>
	import { navItems, siteAuthor } from '$lib/config';
	import { navigating, page } from '$app/stores';
	import IconStroke from './svg/IconStroke.svelte';
	import Wave from './svg/WaveDivider.svelte';
	import Mastodon from './svg/Mastodon.svelte';
	import Bluesky from './svg/Bluesky.svelte';
	export let path;
	let width;
	$: mobile = width < 900;
</script>

<svelte:window bind:innerWidth={width} />
<Wave />

<footer class:mobile>
	<div class="footer-content">
		<p>&copy; 2023-{new Date().getFullYear()}</p>
		<p>{siteAuthor}</p>
		<div class="">
			<a
				class="icon-link"
				target="_blank"
				style="color: var(--surface2-light)"
				href="https://bsky.app/profile/seblammers.bsky.social"><Bluesky /></a
			>
			<a
				class="icon-link"
				target="_blank"
				style="color: var(--surface2-light); "
				rel="me"
				href="https://vis.social/@seblammers"><Mastodon /></a
			>
		</div>
	</div>

	<IconStroke stroke="var(--surface2-light)" />

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
	.icon-link {
		&:hover {
			background-color: transparent;
			// color: var(--accent) !important;
		}
	}
	.footer-content {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		@media (max-width: 600px) {
			flex-direction: column;
			gap: var(--space-2xs);
		}
	}
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
		font-family: var(--sansFont);
		font-weight: 300;
		background: var(--ink);
		color: var(--surface2-light);
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

			& > a:hover {
				background-color: transparent;
			}
		}
	}

	.scroll-to-top {
		cursor: pointer;
	}
</style>
