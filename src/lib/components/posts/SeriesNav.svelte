<script>
	export let previous = undefined;
	export let next = undefined;
</script>

<div class="series-nav">
	{#if previous}
		<button>
			<a href={previous} class="no-underline"> Previous Post </a>
		</button>
	{/if}

	{#if next}
		<button>
			<a href={next} class="no-underline"> Next Post </a>
		</button>
	{/if}
</div>
