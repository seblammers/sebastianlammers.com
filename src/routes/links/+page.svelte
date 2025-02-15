<script>
	import Meta from '$lib/components/Meta.svelte';

	const links = [
		{
			title: 'works at nussknagger',
			url: 'https://nussknagger.com',
			description: 'Visit Nussknagger',
			type: 'external'
		},
		{
			title: 'has a website',
			url: '/',
			description: 'Back to homepage',
			type: 'internal'
		},
		{
			title: 'is present on bluesky',
			url: 'https://bsky.app/profile/seblammers.bsky.social',
			description: 'Visit Bluesky',
			type: 'external'
		}
		// You can add more links here as needed
	];
</script>

<Meta />

<div class="links-container">
	<h1>Sebastian Lammers</h1>
	<div class="links-wrapper">
		{#each links as link}
			<a
				href={link.url}
				class="button-simple"
				target={link.type === 'external' ? '_blank' : '_self'}
			>
				<span class="link-title">{link.title}</span>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.links-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;

		padding: var(--space-xs) var(--space-m);

		.button-simple {
			text-align: center;
		}
		.links-wrapper {
			width: 100%;
			max-width: 28rem;
			display: flex;
			flex-direction: column;
			gap: var(--space-m);

			.link-title {
				display: block;
				font-size: var(--step-1);
			}
		}
	}
</style>
