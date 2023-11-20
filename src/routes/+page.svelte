<script>
	import self from '$lib/assets/images/cv/profile_removebg_BW.png';
	import Image from '$lib/components/Image.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { fly } from 'svelte/transition';
</script>

<Meta />
<div class="flex-container flow">
	<div class="flex-items">
		<Image src={self} alt="Portrait of Sebastian Lammers" loading="eager" />
	</div>

	<div class="flex-items intro" in:fly={{ x: 50, duration: 850, delay: 300 }}>
		<h3 id="hi">Hi, I'm Sebastian</h3>
		<p>and I'm a researcher with a passion for <strong>data visualization</strong>.</p>
	</div>

	<div class="flex-items more" in:fly={{ x: 50, duration: 850, delay: 1500 }}>
		<p>
			I love <strong>working with data</strong> and <strong>visualizing it</strong> effectively. And
			I <strong>love to help others</strong> do the same.
		</p>
		<br />

		<p>
			This website is <strong>my playground</strong> to learn about HTML, CSS & JavaScript.
			Sometimes I write
			<a sveltekit:prefetch href="/posts">blog posts</a>
			about things I learned (to help others learn it too) and share
			<a sveltekit:prefetch href="/projects">projects</a> and
			<a sveltekit:prefetch href="/sketches">sketches</a> that I have built.
		</p>
	</div>
</div>

<style lang="scss">
	.flex-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-end;
		align-content: flex-start;
	}

	.flex-items:nth-child(1) {
		display: block;
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 50%;
		align-self: auto;
		order: 0;
	}

	.flex-items:nth-child(2) {
		display: block;
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 50%;
		align-self: auto;
		order: 0;
	}

	.flex-items:nth-child(3) {
		display: block;
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 99%;
		align-self: flex-start;
		order: 0;
	}

	.intro {
		margin-bottom: 1rem;
		margin-top: 0%;
	}
	@media screen and (max-width: 700px) {
		.flex-container {
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
			align-content: center;
			--flow-space: var(--space-xs);

			& > .flex-items {
				max-width: 80vw;
				flex-shrink: 0;
				align-self: flex-start;
				padding-left: var(--space-s);
			}
		}
	}

	.intro > h3 {
		&:hover {
			--_p: 0%; // override hoverstyles
			cursor: default;
		}
	}

	#hi {
		font-size: var(--step-2);
	}
</style>
