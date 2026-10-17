import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-netlify';
import { mdsvex, extensions } from './mdsvex.config.js';
import { mdsvexGlobalComponents } from './src/lib/assets/js/mdsvex-global-components.js';

const globalComponents = mdsvexGlobalComponents({
	dir: `#lib/components`,
	list: [
		['CodeFence', 'CodeFence.svelte'],
		['Blockquote', 'Blockquote.svelte'],
		['Accordion', 'Accordion.svelte']
	],
	extensions
});

export default defineConfig({
	plugins: [
		sveltekit({
			extensions: ['.svelte', ...extensions],
			preprocess: [globalComponents, mdsvex, vitePreprocess()],
			adapter: adapter()
		})
	]
});
