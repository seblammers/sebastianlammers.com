import adapter from '@sveltejs/adapter-static';
import sveltePreprocess  from 'svelte-preprocess';
//import { mdsvex } from 'mdsvex';
import { mdsvex, extensions } from './mdsvex.config.js'
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { highlightCode } from "./src/lib/assets/js/highlight.js";
import { mdsvexGlobalComponents } from './src/lib/assets/js/mdsvex-global-components.js';

const globalComponents = mdsvexGlobalComponents({
	dir: `$lib/components`,
	list: [
		["CodeFence", "CodeFence.svelte"],
		["Blockquote", "Blockquote.svelte"],
		["Accordion", "Accordion.svelte"]
	],
	extensions
  })

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},

	extensions: ['.svelte', ...extensions],

	preprocess: [
		sveltePreprocess(),
		globalComponents,
		mdsvex
	],
};

export default config;
