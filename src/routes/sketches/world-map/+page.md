---
title: 'World Map Projections'
date: '2023-07-26'
href: 'https://svelte.dev/repl/1ee2000a93d748bea7a08aba8d55d6f2?version=4.2.5'
draft: false
image: '/sketch-map.png'
categories:
  - 'projections'
  - 'map'
  - 'interactive'
  - 'svelte'
  - 'd3'
  - 'svg'
---

<script>
  import Image from '$lib/components/Image.svelte';
  import src from '$lib/assets/images/sketches/sketch-map.gif';
  let alt = "A gif of a world map with varying projections based on user input via a dropdown menu."
</script>

<Image {src} {alt} loading="eager"/>

- Over 80 world map projections at your finger tips (all powered by D3!)
- Choose yours in the dropdown menu
- Which projection is your favourite?