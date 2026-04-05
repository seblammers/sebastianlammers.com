<script>
	// copied and modified from
	// https://github.com/untemps/svelte-readotron/blob/main/src/components/Readotron.svelte
	// because direct installation via npm gave error related to SSR
	import { onDestroy, onMount } from 'svelte';
	import { ReadPerMinute } from '@untemps/read-per-minute';
	import { DOMObserver } from '@untemps/dom-observer';
	import { interpolate } from '@untemps/utils/string/interpolate';
	import { isFunction } from '@untemps/utils/function/isFunction';

	// don't need it
	//import ScrollProgress from '../scroll/ScrollProgress'

	let {
		selector,
		lang = 'en',
		template = '%time% min read',
		errorSlot,
		contentSlot,
		...rest
	} = $props();
	//let withScroll = false

	let time = $state(0);
	let words = $state(0);
	let isParsed = $state(false);
	let error = $state(null);
	let empty = 'No content to parse';

	let domObserver = null;
	let progressObserver = null;

	onMount(async () => {
		if (!selector) {
			return;
		}
		try {
			domObserver = new DOMObserver();
			const { node: el } = await domObserver.wait(selector, null, { timeout: 1000 });

			const rdm = new ReadPerMinute();
			({ time, words } = rdm.parse(el.textContent, lang));

			// if (withScroll) {
			//     progressObserver = new ScrollProgress((_, progress) => {
			//         time = Math.max(Math.round(totalTime - totalTime * progress), 0)
			//         words = Math.max(Math.round((totalTime - totalTime * progress) * rate), 0)
			//         dispatch('change', {
			//             time,
			//             words,
			//             progress
			//         })
			//     })
			// }

			isParsed = true;
		} catch (err) {
			error = err.message;
		}
	});

	onDestroy(() => {
		domObserver?.clear();
		progressObserver?.destroy();
	});
</script>

{#if errorSlot && !!error}
	{@render errorSlot(error)}
{:else if contentSlot && !error && isParsed}
	{@render contentSlot(time, words)}
{:else}
	<span data-testid="__readotron-root__" {...rest}>
		{#if !!error}
			{error}
		{:else if isParsed}
			{#if isFunction(template)}
				{@html template(time, words)}
			{:else}
				{interpolate(template, { time, words }, '%')}
			{/if}
		{:else}
			{empty}
		{/if}
	</span>
{/if}
