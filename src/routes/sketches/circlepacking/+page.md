---
title: 'Circle Packing'
date: '2023-08-05'
href: 'https://svelte.dev/repl/c11b051698e547888b91bc10df0f9187?version=4.1.2'
draft: false
image: '/sketch-circle.png'
categories:
  - 'circle packing'
  - 'static'
  - 'svelte'
  - 'd3'
  - 'svg'
---

<script>
  import Image from '$lib/components/Image.svelte';
  import src from '$lib/assets/images/sketches/sketch-circle.png';
  let alt = "A screenshot of a circlepacking chart."
</script>

<Image {src} {alt} loading="eager"/>

- Svelte implementation of [this D3 example](https://observablehq.com/@d3/pack/2) 

