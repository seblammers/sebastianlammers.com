---
title: 'Data Wrangling in JS: 01 Basics'
date: '2023-04-25'
draft: false
image: '/preview-post_data-in-js-01.png'
categories:
  - 'JavaScript'
  - 'data'
  - 'basics'
---

<script>
  import TOC from '$lib/components/posts/TOC.svelte';
  import Card from '$lib/components/Card.svelte';
  import Table from '$lib/components/posts/TableView.svelte';
  import Embed from '$lib/components/EmbedIFrame.svelte';


  // data is fetched from internal API in +page.js
  export let data;
  const penguins = data.penguins;
  const posts = data.posts;

  let somePenguins = [
    {row: 1, species: "Adelie", island: "Torgersen"},
    {row: 2, species: "Adelie", island: "Biscoe"},
    {row: 3, species: "Chinstrap", island: "Torgersen"},
  ];

</script>

<TOC>

- [A basic dataset](#a-basic-dataset)
- [Arrays in JavaScript](#arrays-in-javascript)
- [Objects in JavaScript](#objects-in-javascript)
- [Summary](#summary)
- [Next up](#next-up)

</TOC>

## A basic dataset
Let's get some terminology out of the way before we start to work with the real data.

Look at this simple table, call it a spreadsheet if you like:

<Table data={somePenguins} />

It tells you something about 3 penguins. 
You'll learn more about these penguins and where they live when we dig into the real data set (in the next post). 
Spoiler alert: they were observed by researchers in the Palmer Archipelago, Antarctica.

In the table above, we only have 3 rows, each with a `row` number and two more columns that tell us something about the penguins' `species` and their home `island`. 
This is the typical spreadsheet-like representation that most of us have in mind, esp. when coming from a background of `data.frame` and `tibble` in **R** or `pd.DataFrame` in **Python**. 

<Accordion summary="Variables, values, columns, observations">

I will refer to a whole **column** of a table as a **variable**, such as `species`.
Within each column, there are lots of **values**, such as `Adelie`.
**Values** are often also referred to as **observations**.
  
</Accordion>

But what does the typical **JavaScript** representation look like?

Here are the lines I wrote to define the data in the table above:

```js
let somePenguins = [
    {row: 1, species: "Adelie", island: "Torgersen"},
    {row: 2, species: "Adelie", island: "Biscoe"},
    {row: 3, species: "Chinstrap", island: "Torgersen"},
  ];
```

Notice how it is basically the same as in the table, but more verbose. 

Why do I say *verbose*? 

If you compare the table and the code block, you'll notice that the row numbers run from 1 to 3 and they're all visually aligned in a column. 
The difference is, that *in the table*, the column name `row` is *not repeated*. 
In the code block however, we have the more verbose version that states `row` each time.
But if you focus on the *values* (e.g. 1, 2, 3), you'll see they're right there and they even look like they're in a column!
Same for the other two variables: if you focus on the data entries highlighted in green in the code block, you see the same as in the familiar spreadsheet-style table.

But let's dig a little deeper into this simple code block. 
Technically speaking `somePenguins` is an **array of objects**. 
This is important, because it tells us what kind of **functions/methods** we can use to work with this data. 

If you're new to **JavaScript** and you're not sure what an **array** and an **object** is... 
Well you've come to the right place! I'll point out the most important basics and link to further resources for you to go through. 
If you know this already, feel free to skim these sections or jump directly to the [next post](/posts/data-in-js-02).

## Arrays in JavaScript
An **array** is just a convenient way to store of similar things under the a single variable name. Like this:

```js
let penguinSpecies = ["Adelie", "Adelie", "Chinstrap"];
```

See, by enclosing the list of items in square brackets `[]` **JavaScript** registers this as an **array**. And the nice thing about that is: each **array** comes with useful **methods** out of the box.
We'll use the most common ones below to learn about our penguin data.

The most simple example is getting the length of the **array**. You simply do:

```js
console.log(penguinSpecies.length) // prints 3
```

<Accordion summary="What is 'console.log'?">

If this is your first time working with JavaScript: what `print` is in other languages, here it is `console.log`. It prints something into the *console*.
  
</Accordion>

This tells you how many entries your **array** has: in this case 3. Try logging `somePenguins.length`. It works the same way even though in *that* case it's not just a list of strings, but an **array of objects**.

<Accordion summary="Why not .length()?">

Technically speaking, `.length` is a ***property*** and not a **method**.
That is to say, it is not a function that you can call, but rather a property that gets updated automagically to keep track of the **arrays** size.

- [length in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
  
</Accordion>

## Objects in JavaScript
To showcase an **object**, let's create one.
Let's say we want to document some facts about one of our penguins. Let's put down where Rita lives and what type of penguin she is:

```js
let factsAboutRita = {species: "Adelie", island: "Dream"}
```

This time we enclosed our data in curly brackets `{}` and gave each entry a `key:` and a `value`. Pretty neat to store data, right? 
There are a couple of functions that help us to access e.g. all keys in any given **object**. 

<Accordion summary="Keys and values">

- [keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys): The Object.keys() method returns an array of a given object's own enumerable string-keyed property names.
- [values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values): The Object.values() method returns an array of a given object's own enumerable string-keyed property values.
  
You'll see `keys()` in action in just a minute.
</Accordion>

If we want to access a specific value we can use the **objects'** name and the key via the dot notation:

```js
console.log(factsAboutRita.species) // prints "Adelie"
```

<Accordion summary="Bracket notation">

Bracket notation provides an alternative way to access object properties.

```js
console.log(factsAboutRita["species"]) // prints "Adelie" too
```

I'll continue to use the dot notation in the examples below, because it's easier to type and more common in general.

You can see a comparison of both notations on [MDN here](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics#dot_notation).
</Accordion>

## Summary
Great, now let's circle back to our initial **array of objects** to recap:

```js
let somePenguins = [
    {row: 1, species: "Adelie", island: "Torgersen"},
    {row: 2, species: "Adelie", island: "Biscoe"},
    {row: 3, species: "Chinstrap", island: "Torgersen"},
  ];
```

The whole of `somePenguins` is an **array** `[]` that has useful methods that **JavaScript** offers us (more on that below). 

Each entry in our **array** is an **object** `{}`. 
All of our **objects** can be thought of as the rows of our table. 
Inside these rows, we have the key and value pairs. 

This data representation is more verbose than the spreadsheet-style that you might be used to, but it actually makes reading the data easier by eye and is more precise for coding.
What's more, an **array of objects** is the standard data representation that you will get if you read in external data with **d3** via the [d3-fetch](https://github.com/d3/d3-fetch) or [d3-dsv](https://github.com/d3/d3-dsv) modules.
So it is a pretty standard way of representing data, especially in the context **data visualizations for the web**.
In addition, an **array** is also the kind of structure that **Svelte** `{#each}` blocks need, so it's very useful if you want make great data visualizations with Svelte & D3.

Next, we're gonna pull in the real dataset and then take a look at the vanilla **JavaScript** functions that we can leverage to work with the data and answer some basic questions about the data.

## Next up
<Card post={posts[1]} />