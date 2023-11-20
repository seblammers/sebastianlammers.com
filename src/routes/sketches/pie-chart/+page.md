---
title: 'Pie Chart'
date: '2023-07-04'
href: 'https://svelte.dev/repl/9dca4b51c5f24f38a2c1ce681a1142c1?version=4.2.6'
draft: false
image: '/sketch-pie.png'
categories:
  - 'pie chart'
  - 'static'
  - 'svelte'
  - 'd3'
  - 'svg'
---

<script>
  import Image from '$lib/components/Image.svelte';
  import src from '$lib/assets/images/sketches/sketch-pie.png';
  let alt = "A screenshot of a pie chart with way too many slices and colours."
</script>

<Image {src} {alt} loading="eager"/>

- Svelte implementation of [this D3 example](https://observablehq.com/@d3/pie-chart/2) 
- It's a bad example, because it has way too many slices
