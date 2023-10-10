<script>
	import { format } from 'd3-format';
	export let value;
	export let isKm;
	export let handleClick;
	export let formatString = '.3s';
	let formatter = format(formatString);

	// toggle between unit-labels
	$: label = isKm ? 'km' : 'mi';

	// toggle between km and miles
	$: shownValue = isKm ? value : value / 1.609334;

	// title (shown on hover)
	const title = 'Tap to toggle km / mi';
</script>

<span
	role="button"
	tabindex="0"
	class="clickable"
	{title}
	on:click={handleClick}
	on:keypress={handleClick}
>
	{formatter(shownValue)}
	{label}
</span>

<style>
	.clickable {
		text-decoration: underline dotted var(--accent) 1px;
	}
	.clickable:hover {
		cursor: pointer;
	}
</style>
