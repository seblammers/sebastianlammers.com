import adapter from '@sveltejs/adapter-netlify';
import sveltePreprocess  from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { highlightCode } from "./src/lib/assets/js/highlight.js";
import { mdsvexGlobalComponents } from './src/lib/assets/js/mdsvex-global-components.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},

	extensions: ['.svelte', '.md'],

	preprocess: [
		sveltePreprocess(),
		mdsvexGlobalComponents({
			dir: `$lib/components`,
			list: [["CodeFence", "CodeFence.svelte"]],
			extensions: ['.md'],
		  }),
		mdsvex({
			extensions: ['.md'],
			highlight: {
				highlighter: highlightCode,
			  },
			layout: {
				posts: 'src/routes/posts/_post.svelte'
			},
			rehypePlugins: [
				rehypeSlug,
				[rehypeAutolinkHeadings, { behavior: "wrap" } ],
			]
		})
	],
};

export default config;
