---
title: 'Awesome Svelte & D3 Website'
date: '2023-04-24'
draft: false
image: 'awesome-svelte-and-d3.png'
categories:
  - 'JavaScript'
  - 'Design'
  - 'Community'
  - 'Learning'
---

<script>
  import Image from '$lib/components/Image.svelte';
  import src from '$lib/assets/images/projects/awesome-svelte-and-d3/screenshot-am-I-responsive.png';

  let alt = "A multi-screenshot image (desktop, tablet, mobile) of the Awesome Svelte & D3 Website powered by https://ui.dev/amiresponsive"
</script>

<Image {src} {alt} loading="eager"/>

## Description
[The Awesome Svelte & D3 website](https://awesome-svelte-and-d3.netlify.app/) aims to collect great resources to help people learn about the **combination of Svelte and D3** for **data visualization**.

Both **real world projects** as well as **tutorials** are linked.

## Technologies used

- The site is developed with [SvelteKit](https://kit.svelte.dev/)
- It uses [Utopia](https://utopia.fyi/) for fluid responsive design
- The content is pulled in from a [Hygraph CMS](https://hygraph.com/) project
- The font used is [Clear Sans](https://github.com/intel/clear-sans)
- The code is [public here](https://github.com/seblammers/awesome-svelte-and-d3-website)