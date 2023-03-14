---
title: 'Basic Layout Tests'
date: '2022-05-31'
draft: true
description: 'Brief overview of different layout aspects to check.'
categories:
  - 'sveltekit'
  - 'web'
  - 'CSS'
  - 'markdown'
---

<script>
  import Image from "$lib/components/Image.svelte"
</script>

## This is a H2 Header

Here is a *normal* paragraph. Give the browser some solid rules and hints, then let it make the **right decisions** for the people that visit it, based on their device, connection quality and capabilities. This is how they will get a genuinely great user experience, rather than a fragmented, broken one.

### This is a H3 Header

Instead of brute-forcing your designs together with a CSS framework, consider opting for a CSS methodology like CUBE CSS, SMACSS or BEM that empowers you to write flexible, portable CSS, rather than rigid, inflexible and overly-specific CSS.

### Inline code

I want to see inline code `for(real)`. But I also want to see **Code Blocks**: dude.

```css
.readotron {
	background-color: white;
}
```

### List, lists, lists

#### Unorderly

- did you know
- this is a list?
- I don't know about you
  - but this looks good


#### Very orderly

1. counter-increment is a CSS property that will increment a specific "counter" variable whenever it encounters a new element. We put it on every ordered-list item. I named my variable "muffins", because I like muffins.
2. Before each ordered-list item, I display the current value of the count. counter() can be thought of as a CSS function which returns the value for a specific counter. In this case, muffins.
3. I remove the default uncustomizable bullets with list-style: none, and specify a counter reset. This ensures that if I have multiple `<ol>` elements on a page, the counter will reset for each one.

#### This is a H4 Header

Creating type scales that respond to the viewport, rather than setting explicit values for typography and space allows you to set rules once and forget about them, knowing that whatever device, regardless of its available size will be presented with appropriate sizes.

## Oh, you're not done yet?

Take this image and be happy:
<Image src="/images/posts/basic-layout-tests/happy.png" alt="A happy picture." />
