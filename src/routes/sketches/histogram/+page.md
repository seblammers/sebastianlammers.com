---
title: 'Histogram + Tooltip'
date: '2023-05-12'
href: 'https://svelte.dev/repl/04647dd6ac3f4bd0bf713641ccd19a22?version=4.2.2'
draft: false
image: '/sketch-histo.png'
categories:
  - 'histogram'
  - 'tooltip'
  - 'interactive'
  - 'svelte'
  - 'd3'
  - 'svg'
---

<script>
  import Image from '$lib/components/Image.svelte';
  import src from '$lib/assets/images/sketches/sketch-histo.png';
  let alt = "A Screenshot of a histogram with a mouse cursor and a tooltip."
</script>

<Image {src} {alt} loading="eager"/>

- Interactive tooltip
- Bar highlighting via CSS
- Mean value indicated 
