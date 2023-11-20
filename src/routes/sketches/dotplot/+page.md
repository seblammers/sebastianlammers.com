---
title: 'Dot Plot'
date: '2023-07-28'
href: 'https://svelte.dev/repl/2e25d97834c94387acb8537b6a083b03?version=4.1.1'
draft: false
image: '/sketch-dotplot.png'
categories:
  - 'dot plot'
  - 'colour legend'
  - 'static'
  - 'svelte'
  - 'd3'
  - 'svg'
---

<script>
  import Image from '$lib/components/Image.svelte';
  import src from '$lib/assets/images/sketches/sketch-dotplot.png';
  let alt = "A screenshot of a dotplot with a colour legend."
</script>

<Image {src} {alt} loading="eager"/>

- Svelte implementation of [this D3 example](https://observablehq.com/@d3/dot-plot/2) 

