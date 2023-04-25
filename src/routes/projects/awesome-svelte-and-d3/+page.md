---
title: 'Awesome Svelte & D3 Website'
date: '2023-04-24'
draft: false
image: "./preview.png"
categories:
  - 'JavaScript'
  - 'Design'
  - 'Community'
  - 'Learning'
---

<script>
  import TOC from '$lib/components/posts/TOC.svelte';
  import ListFlip from '$lib/components/posts/ListFlip.svelte';
  import Card from '$lib/components/Card.svelte';
  import Table from '$lib/components/posts/TableView.svelte';
  import Embed from '$lib/components/EmbedIFrame.svelte';
  import Image from '$lib/components/Image.svelte';
  import src from '$lib/assets/images/projects/awesome-svelte-and-d3/screenshot-am-I-responsive.png';

    let alt = "A multi-screenshot image (desktop, tablet, mobile) of the Awesome Svelte & D3 Website powered by https://ui.dev/amiresponsive"
</script>

<Image {src} {alt}/>

## Description
[The Awesome Svelte & D3 website](https://awesome-svelte-and-d3.netlify.app/) aims to collect great resources to help people learn about the combination of Svelte and D3 for data visualization.
Both **real world projects** as well as **tutorials** are linked.

## Stack

- developed with [SvelteKit](https://kit.svelte.dev/)
- uses [Utopia](https://utopia.fyi/) for fluid responsive design
- content is pulled in from a [Hygraph CMS](https://hygraph.com/) project
- font used is [Clear Sans](https://github.com/intel/clear-sans)
- code is [public here](https://github.com/seblammers/awesome-svelte-and-d3-website)