<script>
	import { format } from 'd3-format';

	let { value, isKm, handleClick, formatString = '.3s' } = $props();
	let formatter = $derived(format(formatString));

	// toggle between unit-labels
	let label = $derived(isKm ? 'km' : 'mi');

	// toggle between km and miles
	let shownValue = $derived(isKm ? value : value / 1.609334);

	// title (shown on hover)
	const title = 'Tap to toggle km / mi';
</script>

<span
	role="button"
	tabindex="0"
	class="clickable"
	{title}
	onclick={handleClick}
	onkeypress={handleClick}
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
