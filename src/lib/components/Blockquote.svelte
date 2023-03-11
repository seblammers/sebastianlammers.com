<script>
	export let text = 'Default quote text.';
	export let url = undefined; //A URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote.
	export let author = 'Some Person';
	export let source = undefined;
</script>

<!--starting it all with a figure tag to hold things together -->
<figure>
	<!--then we use the blockquote tag for the main text -->
	<blockquote cite={url ? url : 'no link available'}>
		<!-- for basic styling in the quoted text, use html for now-->
		<p>{@html text}</p>
	</blockquote>

	<!--and right below we put the author and source -->
	<figcaption>
		<a href={url} target="blank" rel="noopener noreferrer" class="no-underline">—{author}</a>

		{#if source}, <cite>{source}</cite>{/if}
	</figcaption>
</figure>

<style>
	blockquote {
		border: var(--radius) solid var(--accent);
		border-radius: var(--radius);
		padding: var(--space-s);
		margin: var(--space-xs) 0;
		margin-bottom: var(--space-3xs);
		max-width: var(--max-width);
		border-style: none none none solid;
		background-color: var(--surface0-light);
		font-family: var(--accentFont);
	}

	blockquote p {
		padding: var(--space-xs);
		font-style: italic;
	}

	blockquote p::before {
		content: '\201C';
	}

	blockquote p::after {
		content: '\201D';
	}

	figure {
		max-width: 60ch;
		margin: auto;
	}

	figcaption {
		text-align: right;
		margin-right: var(--space-s-m);
		margin-top: var(--space-3xs);
	}
</style>
