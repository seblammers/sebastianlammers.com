---
title: 'Dataviz with Svelte from scratch: Scatter plots'
date: '2022-09-08'
categories:
  - 'svelte'
  - 'dataviz'
  - 'd3'
  - 'tutorial'
  - 'from scratch series'
---

<script>
  import Scatter from '$lib/components/posts/Scatter.svelte'
</script>

Creating interactive data visualizations for the web was always fascinating - and it used to be challenging.
But Svelte changed that. As Connor outlined nicely in his post, Svelte makes the creation more declarative.

One of the first plots you likely want to try to make is a scatter plot. Possibly *the* most classic plot of them all... (Citation needed.)
I mean, it doesn't get more basic than that: two axes (x & y) and points between them. Each data point tells us a tiny bit about a possible relation between x and y. So let's get to work. Here is what we're creating:

<Scatter />

Let's start really simple.

