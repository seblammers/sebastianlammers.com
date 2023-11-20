---
title: 'Streamgraph'
date: '2023-07-04'
href: 'https://svelte.dev/repl/4542a7dcb2704587a355914c6f05ed63?version=4.2.6'
draft: false
image: '/sketch-stream.png'
categories:
  - 'streamgraph'
  - 'static'
  - 'svelte'
  - 'd3'
  - 'svg'
---

<script>
  import Image from '$lib/components/Image.svelte';
  import src from '$lib/assets/images/sketches/sketch-stream.png';
  let alt = "A screenshot of a streamgraph."
</script>

<Image {src} {alt} loading="eager"/>

- Svelte implementation of [this D3 example](https://observablehq.com/@d3/streamgraph/2) 

