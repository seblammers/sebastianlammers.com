---
title: 'Choropleth Map'
date: '2023-07-24'
href: 'https://svelte.dev/repl/7d7c651eb5b746aab45fa9735bb09956?version=4.2.5'
draft: false
image: '/sketch-choro.png'
categories:
  - 'choropleth'
  - 'map'
  - 'static'
  - 'svelte'
  - 'colour legend'
  - 'd3'
  - 'svg'
---

<script>
  import Image from '$lib/components/Image.svelte';
  import src from '$lib/assets/images/sketches/sketch-choro.png';
  let alt = "A screenshot of a choropleth map of the USA."
</script>

<Image {src} {alt} loading="eager"/>

- Classic choropleth map of the USA
- Custom colour legend
- Svelte implementation of [this D3 example](https://observablehq.com/@d3/choropleth/2) 
