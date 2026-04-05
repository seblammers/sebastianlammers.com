import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, extensions } from './mdsvex.config.js';
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
		globalComponents,
		mdsvex,
		vitePreprocess()
	],
};

export default config;
