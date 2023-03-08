---
title: 'Data Wrangling in JS: 00 Intro'
date: '2023-02-11'
draft: false
categories:
  - 'JavaScript'
  - 'data'
  - 'basics'
---

<script>
  import TOC from '$lib/components/posts/TOC.svelte';
  import ListFlip from '$lib/components/posts/ListFlip.svelte';
  import Card from '$lib/components/Card.svelte';
  import Table from '$lib/components/posts/TableView.svelte';
  import Embed from '$lib/components/EmbedIFrame.svelte';

  export let data;
  let posts = data.posts;
</script>

Welcome to this series.

Instead of giving you one giant blog post, I give you multiple smaller ones. 
You can decide if you read all of it or jump to the more advanced stuff in the later sections of the series. 

*This post* serves as the introduction and gives you an overview of what to expect in each of the parts.
It will also tell you about some of the conventions I use throughout the series and how to run the code examples.


<TOC>

- [What is it all about?](#what-is-it-all-about)
- [Brief contents of each post](#brief-contents-of-each-post)
- [Conventions](#conventions)
- [How to run the code](#how-to-run-the-code)
  - [1: In your console](#1-in-your-console)
  - [2: In REPLs](#2-in-repls)
- [Go!](#go)

</TOC>

## What is it all about?
This series will give you an overview of how you can work with **tabular data** in the world of **vanilla JavaScript**.

<Accordion summary="Vanilla???">

Vanilla JavaScript really just refers to plain JavaScript: no extra libraries, no framework, nothing.

And no: no ice cream involved.
</Accordion>

If you are familiar with other programming languages such as **Python** or **R**, you might have some expectations about what a programming language delivers in terms of data manipulation tools.

Well, let me tell you a good thing and a bad thing. 

<ListFlip />

With that said, let's go through a quick breakdown of the separate parts of this series.
## Brief contents of each post

<Card post={posts[0]} />

The first part will introduce basic terminology to talk about tabular data and how that is typically represented in JavaScript.
Arrays and Objects are introduced.

<hr>

<Card post={posts[1]} />

The second part demonstrates useful methods that let you characterize a dataset.
Slice(), filter(), Set(), and map() are introduced with practical examples.

<hr>

<Card post={posts[2]} />

The third part goes deeper into basic methods that let you characterize a dataset.
Reduce() and sort() are introduced.
Map() has a reprise with some fundamental data wrangling applications.

<hr>

## Conventions
A lot of Accordions. I mean these things:

<Accordion summary="I'm an Accordion!">

Overview first, details on demand.

You decide how much you want to read.

Some of these contain links to further resources. 
Others contain some advanced examples.
If you ignore all of them you will still get the main message of what each post is trying to say.
</Accordion>

So feel free to just skim through the main texts, or go through the Bonus-Parts as well.

## How to run the code
Since every line of code in this series is plain **vanilla JavaScript**, you can actually just run it the browser that you are using right now to read this --- and I think that's beautiful! Your browser is well equipped by default.

If you're reading this on mobile that's fine too, but I assume you won't plan on running any code then.
 

So, there are two ways I recommend to run the code examples: the console or REPLs.

### 1: In your console
If you never opened the console of your browser before, I encourage you to try this *right now* (tested on Firefox and Chrome): press `Shift + Ctrl + I`.
This brings up your *developer tools*, of which there are many. 
In the top row select the `Console` tab and then copy & paste the following code and press `Enter`.

<Accordion summary='Stop, I use Mac OS!'>

If you're trying to do this on a Mac *for the first time*, it is slightly harder.
Here are the steps you need to take:

1. Click on the Safari menu in the top-left corner of the screen.
2. Select "Preferences" from the dropdown menu.
3. In the Preferences window, click on the "Advanced" tab.
4. At the bottom of the Advanced tab, check the box next to "Show Develop menu in menu bar".
5. Close the Preferences window.
6. Now you should see a new menu item "Develop" in the top menu bar. Click on it.
7. From the Develop menu, select "Show Web Inspector" or press the shortcut key combination `Option + Command + I`.

In the top row select the `Console` tab and then copy & paste the following code and press `Enter`.
</Accordion>

```js
alert("Hello world!")
```

Congrats, you're now a hacker! If you'd rather be an accountant, feel free to use the console as a fancy calculator on any website :)

No, but seriously: you can run all the code snippets in your browser's console like this. Just make sure you follow along and have fun.

<Accordion summary='Further resources on developer tools'>

- [What are browser developer tools? in the MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools)


</Accordion>


### 2: In REPLs
If you'd rather have a more persistent scratchpad to run the code examples and maybe take some notes, then I recommend you try [a Svelte REPL](https://svelte.dev/repl/1d2f74c5ef564aa9be09d50e5f59eccb?version=3.55.1).

Here is what the one linked to above looks like:
<Embed 
  src="https://svelte.dev/repl/1d2f74c5ef564aa9be09d50e5f59eccb?version=3.55.1" 
  title="A Svelte REPL titled 'Data Wrangling in JS: 00 Intro'"
/>

In the most basic way you can think of it this way: the `App.svelte` allows you to combine three things in one place:

1. you write **JavaScript code** in a script tag
2. you write **HTML markup** next to it and reference your JavaScript variables like `{this}`
3. you write **CSS declarations** in a style tag

<Accordion summary='How to save your progress'>

If you want to preserve your precious notes, you can simply **log in** with your **Github credentials**.
But you can also use it *without logging in at all*.

If you don't want to log in, you can still **download** the current status of your REPL as a **zip file**.

<hr>

If you want to run that zipped app locally and have no clue where to begin: This article [Svelte for new developers](https://svelte.dev/blog/svelte-for-new-developers) is up to date and very concise.

If you want a longer version (albeit a bit older): The Mozilla Web Docs got you covered.
Check out their guide [Getting started with Svelte](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_getting_started), which links to everything you need to get up to speed and adds commentary on most of the moving parts.

</Accordion>

<Accordion summary='What is a REPL?'>

Glad you asked: REPL is short for [Read–eval–print loop](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop), which Wikipedia defines as *"a simple interactive computer programming environment that takes single user inputs, executes them, and returns the result to the user"*.

Frankly, a Svelte REPL is a little more sophisticated than that, because the user input is not very restricted.

You can define multiple components and build full apps within a Svelte REPL.
</Accordion>

## Go!
With all this out of the way: go ahead and read the first real post!

<Card post={posts[0]} />
