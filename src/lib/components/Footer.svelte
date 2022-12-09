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

	<IconStroke stroke="white" />
	<p
		class="scroll-to-top"
		on:click={() => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		}}
	>
		Scroll to top &uarr;
	</p>
	<!-- <div class="links">
    {#each navItems as page, i (i)}
        <a
            href={page.route}
            class:active={isActive(`${page.route}`)}>
            {page.title}
        </a>
    {/each}
</div> -->
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
		}
	}

	.scroll-to-top {
		cursor: pointer;
	}
	//   .links {
	//     margin: 0px auto;
	//     display: flex;
	//     flex-direction: column;
	//     gap: var(--space-s);
	//     a {
	//         font-size: var(--step-1);
	//         border-width: 2px;
	//         // border: none;
	//     }
	// }
</style>
