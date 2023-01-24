<script>
	// started from here:
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
</script>

<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				{#each colNames as col}
					<th>{col}</th>
				{/each}
			</tr>
		</thead>

		<tbody>
			{#each data as dat}
				<tr>
					{#each colNames as col}
						<td>{dat[col]}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<!-- style in _layout.scss -->
