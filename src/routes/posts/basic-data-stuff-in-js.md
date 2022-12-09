---
title: 'Basic Data Manipulation in Javascript'
date: '2022-12-07'
categories:
  - 'javascript'
  - 'data'
  - 'csv'
  - 'basics'
---

<script>
  import Accordion from '$lib/components/Accordion.svelte';
  import Blockquote from '$lib/components/Blockquote.svelte';
  import Table from '$lib/components/posts/TableView.svelte';

  let simpleData = [
    {a: 1, b: "dog"},
    {a: 2, b: "dog"},
    {a: 3, b: "cat"},
    {a: 4, b: "dog"},
    {a: 5, b: "cat"},
  ]
</script>


This is a simple overview of how you can work with tabular data in the world of vanilla Javascript.
If you are familiar with other programming languages such as Python or R, you might have some expectations about what a programming language delivers in terms of data manipulation.

Well, let me tell a good thing and a bad thing. Which one do you want to hear first?
(TODO: add a toggle component that lets reader decide in which order. See [this REPL](https://svelte.dev/repl/b87c70cc003647578e71f387be95222c?version=3.20.1)).

Good thing: you can do a lot with little help of basic vanilla array-methods.

Bad thing: you can not do the same amount of stuff as in Python or R.

Let's dive into a basic example first and then load a real dataset to dive deeper.

### A basic dataset
Let's get some terminology out of the way before we start to work with the real data.


```js
let simpleData = [
    {a: 1, b: "dog"},
    {a: 2, b: "dog"},
    {a: 3, b: "cat"},
    {a: 4, b: "dog"},
    {a: 5, b: "cat"},
  ]
```
<Table data={simpleData} />