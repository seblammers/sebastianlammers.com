<script>
	export let post;
	import { dateFormat } from '$lib/assets/js/utils';
</script>

<article class="card">
	<a sveltekit:prefetch href={post.path}>
		{#if post.meta.image !== false}
			<img src={post.meta.image} alt="Preview of: {post.meta.title}" />
		{/if}
		<div>
			<h3 class="title">
				{post.meta.title}
			</h3>
			<div class="more">
				<time>{dateFormat(post.meta.date)}</time>
				<div class="pill">Read More</div>
			</div>
		</div>
	</a>
</article>

<style lang="scss">
	.card {
		font-family: var(--accentFont);
		border-radius: var(--radiusSection);
		border: var(--radius) solid var(--accent);
		padding: var(--space-m);
		background-color: var(--surface2-light);
		max-width: calc(var(--space-3xl) * 2.5);
		transition-property: all;
		transition-duration: 0.5s;

		& > a {
			text-decoration: none;

			&:hover {
				color: inherit;
			}
		}

		&:hover {
			box-shadow: 0px 0px 20px var(--accent);
		}
		&:hover h3 {
			transform: scale(1.01) translateY(-0.5%);
		}
		h3:hover {
			--_p: 0%;
		}
		time {
			color: var(--ink);
		}

		.pill {
			font-size: var(--step-0);
			font-weight: bold;
			color: var(--surface2-light);
			background-color: var(--ink);
			border-color: var(--ink);
			padding: var(--space-2xs) var(--space-s);
			transition-property: all;
			transition-duration: 0.5s;
			&:hover {
				background-color: var(--accent);
				color: var(--ink);
				border-color: var(--accent);
				box-shadow: 0px 0px 20px var(--accent);
			}
		}
		.more {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>
