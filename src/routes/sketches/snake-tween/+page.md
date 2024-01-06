---
title: 'Morphing SVG Shapes'
date: '2023-08-23'
href: 'https://svelte.dev/repl/b80a8aeeec2242f1916acd3354733ce0?version=4.2.5'
draft: false
image: '/sketch-snake-tween.png'
categories:
  - 'flubber'
  - 'shapes'
  - 'animation'
  - 'interactive'
  - 'svelte'
  - 'paths'
  - 'svg'
---

<script>
  import Image from '$lib/components/Image.svelte';
  import src from '$lib/assets/images/sketches/sketch-snake-tween.gif';
  let alt = "A gif of a snake shape that morphs into a circle shape after the user clicks a circle-button. While changing shape the color is also morphed from blue (snake) to orange (circle). The user then clicks the snake-button to reverse the effect."
</script>

<Image {src} {alt} loading="eager"/>

- Morphing two SVG shapes, powered by [Flubber.js](https://github.com/veltman/flubber)
- Just for fun, also morphing between two colours, powered by [D3-interpolate](https://github.com/d3/d3-interpolate)
- All orchestrated by the mighty [tweened store](https://svelte.dev/docs/svelte-motion)
- The animation is controlled by the user clicking the button