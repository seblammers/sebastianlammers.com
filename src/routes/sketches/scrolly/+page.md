---
title: 'Scrollytelling Scatterplot'
date: '2023-06-29'
href: 'https://svelte.dev/repl/e59b909384c04393af26be2eb7fa859e?version=4.2.5'
draft: false
image: '/sketch-scrolly.png'
categories:
  - 'scatter plot'
  - 'scrollytelling'
  - 'interactive'
  - 'svelte'
  - 'd3'
  - 'svg'
---

<script>
  import Image from '$lib/components/Image.svelte';
  import src from '$lib/assets/images/sketches/sketch-scrolly.gif';
  let alt = "A gif of a scatterplot that changes it's configuration based on the user's scroll-position."
</script>

<Image {src} {alt} loading="eager"/>

- Scroll-driven animation
- Synchronized text and data elements
- Responsive layout 
