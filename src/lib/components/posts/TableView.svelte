<script>
	// adapted from here
	// https://svelte.dev/repl/9d1bc0a8af79459f8ad0cd6c9cb82fa2?version=3.29.4
	// thank you kind stranger
	export let data;

	// take care of special case of "single row data"
	// that may not be an array of objects, but just
	// an object (convert to array in that case)
	if (!Array.isArray(data)) {
		data = [data];
	}
	// extracting the keys to display as table header
	let colNames = Object.keys(data[0]);

	// todo: add spacing tokens to make spacing consistent
</script>

<div class="wrapper">
	<table>
		<thead>
			<tr>
				{#each colNames as col}
					<th>{col}</th>
				{/each}
			</tr>
		</thead>

		<tbody>
			{#each data as d, index}
				<tr>
					{#each colNames as col, index}
						<td>{d[col]}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.wrapper {
		overflow-x: auto;
		overflow-y: hidden;
		max-width: 60ch;
		font-family: var(--codeFont);
	}

	table {
		max-width: 100%;
		border: 0;
		white-space: nowrap;
		border-collapse: collapse;
		border: 1px solid rgba(0, 0, 0, 0.12);
		border-radius: 4px;
		background-color: var(--surface2-light);
	}

	th {
		height: 56px;
		text-align: left;
		padding-right: 16px;
		padding-left: 16px;
	}

	tr {
		height: 52px;
		border-top-color: rgba(0, 0, 0, 0.12);
		border-top-width: 1px;
		border-top-style: solid;
	}
	tr:hover {
		background-color: rgba(0, 0, 0, 0.09);
	}

	td {
		padding-right: 16px;
		padding-left: 16px;
	}
</style>
