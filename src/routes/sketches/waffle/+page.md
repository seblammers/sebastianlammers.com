---
title: 'Waffle Chart'
date: '2024-01-06'
href: 'https://svelte.dev/repl/2e51fd4c62404d04b1ca79df29e20d71?version=4.2.8'
draft: false
image: '/sketch-waffle.png'
categories:
  - 'waffle'
  - 'static'
  - 'svelte'
  - 'responsive'
  - 'css'
---

<script>
  import Image from '$lib/components/Image.svelte';
  import src from '$lib/assets/images/sketches/sketch-waffle.gif';
  let alt = "A gif of a waffle chart that adapts in layout based on the available space. The user drags the border of the window, making the available space smaller. The layout of the individual blocks in the waffle charts fluidly responds to the available space, breaking into new rows where needed. The user then drags the border back to the initial state."
</script>

<Image {src} {alt} loading="eager"/>

- Svelte implementation of a simple waffle chart (no D3 here actually).
- Responsive layout of the blocks is handled via flexbox CSS.
- Inspired by the D3 version in [this article by The Pudding](https://pudding.cool/process/flexbox-layout/).

