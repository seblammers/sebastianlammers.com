import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { highlightCode } from "./src/lib/assets/js/highlight.js";
import md from 'mdsvex'

export const extensions = ['.svelte.md', '.md', '.svx']

export const mdsvex = md.mdsvex({
  extensions,
  smartypants: {
    dashes: 'oldschool'
  },
  highlight: {
    highlighter: highlightCode,
    },
  layout: {
    posts: 'src/routes/posts/_post.svelte',
    _: "src/routes/_mdsvex.svelte" 
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
})