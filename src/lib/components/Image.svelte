<script>
	// kudos to connor!
	// https://github.com/connorrothschild/.com/blob/master/src/lib/Global/Image.svelte
	import { fade } from 'svelte/transition';

	let { src, alt, width = '100%', centered = false, style = '', loading = 'lazy', href = null } = $props();

	let expanded = $state(false);

	const toggleExpand = function () {
		if (href) {
			return;
		}
		expanded = !expanded;
	};
</script>

<svelte:window
	onscroll={() => {
		expanded ? (expanded = false) : null;
	}}
	onkeydown={(e) => {
		e.key == 'Escape' ? (expanded = false) : null;
	}}
/>

{#if expanded}
	<div
		transition:fade
		class="fullscreen-unscrollable"
		role="button"
		tabindex="0"
		onclick={() => {
			expanded = false;
		}}
		onkeydown={(e) => { e.key === 'Enter' && (expanded = false); }}
	></div>
	<img transition:fade class="expanded" {src} {alt} onclick={toggleExpand} />
{/if}
<a {href} target="_blank" rel="noopener noreferrer" class="no-underline">
	<img {loading} {src} {alt} {width} {style} onclick={toggleExpand} class:centered class:href />
</a>

<style>
	.centered {
		display: block;
		margin: auto;
	}

	.fullscreen-unscrollable {
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.7);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 102;
		display: flex;
		place-items: center;
		justify-content: center;
	}

	img:not(.expanded) {
		cursor: zoom-in;
		z-index: 1;
		position: relative;
		margin-bottom: 0;
	}

	img:last-of-type {
		margin-bottom: 1.15rem;
	}

	img.href {
		cursor: pointer;
	}

	.expanded {
		z-index: 103;
		max-height: 85%;
		max-width: 85%;
		left: 50%;
		top: 50%;
		position: fixed;
		transform: translate(-50%, -50%);
		border-radius: 5px;
		cursor: zoom-out;
		object-fit: contain;
	}

	@media screen and (max-width: 768px) {
		img {
			width: 100% !important;
		}
	}
</style>
