<script>
	// adapted from: https://github.com/gitpod-io/website/pull/2322/files
	export let lang = '';
	export let code = null;
	export let title = null;
	export let rawCode = null;
	import ClipboardSvg from './svg/ClipboardSVG.svelte';
	let copiedSuccessfully = false;

	const displayLanguageMap = {
		yaml: 'yml',
		shell: 'bash',
		svelte: 'js' // gives an error when parsing svelte?
	};

	const mapDisplayLanguage = (str) => {
		return displayLanguageMap[str.toLowerCase()] || str;
	};

	let copyCode = async () => {
		try {
			const copiedCode = rawCode;
			await navigator.clipboard.writeText(copiedCode);
		} catch (e) {}
		copiedSuccessfully = true;
	};

	$: if (copiedSuccessfully) {
		setTimeout(() => {
			copiedSuccessfully = false;
		}, 1000);
	}
	$: title = title ?? mapDisplayLanguage(lang);
</script>

<div class="code-fence">
	<div class="sticky title">
		<div class="language">{lang}</div>

		<button on:click={copyCode} class="button"
			><span class={copiedSuccessfully ? 'hidden' : 'visible'}>copy code </span>

			<span class="copied {copiedSuccessfully ? 'visible' : 'hidden'}" aria-hidden="true">
				copied successfully
			</span>
			<ClipboardSvg copied={copiedSuccessfully} />
		</button>
	</div>
	<div>
		<pre class="language-{lang}">
          <code class="language-{lang}">
{@html code}
      </code></pre>
	</div>
</div>

<style lang="scss">
	.sticky {
		padding-bottom: 0.25rem;
		padding-top: 0.25rem;
		left: 0;
		top: 0;
		position: sticky;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
		max-width: var(--max-width);
		background: var(--ink);
		color: var(--surface2-light);
		border-radius: 0.3em 0.3em 0% 0%;
		border-radius: var(--radiusSection) var(--radiusSection) 0% 0%;
	}

	.language {
		font-size: var(--step-0);
		font-weight: 400;
		margin-left: var(--space-xs);
		color: var(--surface2-light);

		& ::selection {
			color: var(--dark);
			background: var(--surface2-light);
		}
	}

	.button {
		font-size: var(--step-0);
		font-weight: 400;
		transition-duration: 0.2s;
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-delay: 50ms;
		padding-left: var(--space-3xs);
		padding-right: var(--space-3xs);
		padding-bottom: var(--space-2xs);
		padding-top: var(--space-2xs);
		margin-top: 0;
		margin-right: var(--space-s);
		cursor: pointer;
		background-color: transparent;
		border: 0 solid;
		color: var(--surface2-light);
	}

	.visible {
		opacity: 1;
	}

	.hidden {
		display: none;
		opacity: 0;
		transition-property: opacity;
		transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
	}
</style>
