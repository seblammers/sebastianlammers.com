import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { highlightCode } from './src/lib/assets/js/highlight.js';
import { mdsvex as compileMdsvex } from 'mdsvex';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const extensions = ['.svelte.md', '.md', '.svx'];

export const mdsvex = compileMdsvex({
	extensions,
	smartypants: {
		dashes: 'oldschool'
	},
	highlight: {
		highlighter: highlightCode
	},
	layout: {
		posts: resolve(__dirname, 'src/routes/posts/_post-layout.svelte'),
		sketches: resolve(__dirname, 'src/routes/sketches/_sketch-layout.svelte'),
		_: resolve(__dirname, 'src/routes/_mdsvex.svelte')
	},
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap'
			}
		]
	]
});
