---
title: 'Sketches'
date: '2023-11-26'
href: '/sketches'
draft: false
image: 'preview-sketches.png'
categories:
  - 'JavaScript'
  - 'Design'
  - 'SVG'
  - 'Svelte'
  - 'D3'
  - 'Learning'
---

<script>
  import Button from '$lib/components/ButtonSimple.svelte';
  import Image from '$lib/components/Image.svelte';
  import src from '$lib/assets/images/projects/sketches/preview-sketches.png';

  let alt = "Multiple charts and maps layed out in a grid."
</script>

<Image {src} {alt} loading="eager"/>

## Description
This has been an ongoing project for a while now and it will probably always be ongoing, too.
Whenever I see an **interesting chart-type** or interaction pattern, **I'm curious** how it was implemented.
So I start sketching sth. similar with my own tools, most of the time **Svelte & D3**.
I like to built **prototypes** without having to commit to a full-blown project.
This collection has grown large enough and maybe someone will find sth. useful or simply **be inspired** to built their own version.

## Technologies used

- mostly [Svelte](https://svelte.dev/), [D3](https://d3js.org/), and [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG)
- the source code for each sketch can be found on it's respective page

<Button {href}/>
