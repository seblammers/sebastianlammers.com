---
title: 'Syntax highlighting with mdsvex'
date: '2021-12-01'
updated: '2022-04-01'
categories:
  - 'sveltekit'
  - 'web'
  - 'CSS'
  - 'markdown'
---


Here is my new blockquote:
<Blockquote 
text = "Absolutely positioned elements are placed relative to their <b>containing block</b>. The
default containing block is the <code>html</code> element, but will be overridden by certain
ancestor elements. The main scenario that will create a new containing block is if the
element has a <code>position</code> other than the default (<code>static</code>). There are other scenarios,
but they are much more rare (for example, if a transform is specified)."
author="Amelia Wattenberger"
source="Fullstack D3"/>

mdsvex has automatic, built-in syntax highlighting with [Prism.js](https://prismjs.com/); just include the language name **after** the triple backticks, like so:

<Accordion summary="Show me the code">

````
\```css
/* Your CSS here */
\```
````

</Accordion>

And that will render just like so:

```css
.my-css-class {
	color: #ffd100;
	box-sizing: border-box;
	/* etc... */
}
```


## JS

Here's how you'd do JavaScript:

````
\```js
// You can use js or javascript for the language
\```
````

Highlighted code sample:

```js
const invertNumberInRange = (num, range) => {
	return range - num;
};

invertNumberInRange(25, 100); // 75
```

## Svelte

Of course, mdsvex supports Svelte highlighting, too:

<Accordion>

```svelte
<script>
  import myComponent from '$lib/components/myComponent.svelte';

  export let myProp = undefined;
</script>

<div>
  <MyComponent prop={myProp}>
</div>
```

</Accordion>

All these colors are in the `_prism.scss` file inside `src/lib/assets/scss`, if you'd like to change them.
