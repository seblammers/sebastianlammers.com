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
  import Table from '$lib/components/posts/TableView.svelte';
  import data from './data.json';

  let somePenguins = [
    {row: 1, species: "Adelie", island: "Torgersen"},
    {row: 2, species: "Adelie", island: "Biscoe"},
    {row: 3, species: "Chinstrap", island: "Torgersen"},
    {row: 4, species: "Gentoo", island: "Dream"},
    {row: 5, species: "Chinstrap", island: "Dream"},
  ];

  let head = data.slice(0, 3); 
</script>


This is a simple overview of how you can work with tabular data in the world of vanilla Javascript.
If you are familiar with other programming languages such as Python or R, you might have some expectations about what a programming language delivers in terms of data manipulation.

Well, let me tell you a good thing and a bad thing. Which one do you want to hear first?
(TODO: add a toggle component that lets reader decide in which order. See [this REPL](https://svelte.dev/repl/b87c70cc003647578e71f387be95222c?version=3.20.1)).

Good thing: you can do **a lot** with the help of basic vanilla JavaScript array-methods.

Bad thing: you can not do the same amount of stuff as in Python or R. But then again, these two kind of specialize in data wrangling.

Let's dive into a basic example first and then load a real dataset to dive deeper.


### A basic dataset
Let's get some terminology out of the way before we start to work with the real data.

Look at this simple table, call it a spreadsheet if you like:

<Table data={somePenguins} />

It tells you something about 5 penguins. You'll learn more about these penguins and where they live below when we dig into the real data set. Spoiler alert: they were observed by researchers in the Palmer Archipelago, Antarctica.

In the table above, we only have 5 rows, each with a `row` number and two more columns that tell us something about the penguins' `species` and their home `island`. This is the typical spreadsheet-like representation that most of us have in mind, esp. when coming from a background of `data.frame` and `tibble` in R or `pd.DataFrame` in Python. 
But what does the average JavaScript representation look like?

Here are the lines I wrote to define the data in the table above:

```js
let somePenguins = [
    {row: 1, species: "Adelie", island: "Torgersen"},
    {row: 2, species: "Adelie", island: "Biscoe"},
    {row: 3, species: "Chinstrap", island: "Torgersen"},
    {row: 4, species: "Gentoo", island: "Dream"},
    {row: 5, species: "Chinstrap", island: "Dream"},
  ];
```

Notice how it is basically the same, but more verbose. Why do I say verbose? If you compare the table and the code block, you'll notice that the row numbers run from 1 to 5 and they're all visually aligned in a column. The difference is, that in the table, the column name `row` is not repeated. Same for the other two columns: if you focus on the data entries highlighted in green, you see the same as in the familiar spreadsheet-style table.

But let's dig a little deeper into this simple code block. Technically speaking `somePenguins` is an **array of objects**. This is important, because it tells us what kind of functions/methods we can use to work with this data.

If you're new to JavaScript and you're not sure what an **array** and an **object** is... Well you've come to the right place! I'll point out the most important basics and link to further resources for you to go through.

### Arrays in JavaScript
An array is just a convenient way to store of similar things under the a single variable name. Like this:

```js

let penguinNames = ["Rita", "Taco", "Kim"]
```

See, by enclosing the list of items in square brackets `[]` JavaScript registers this as an array. And the nice thing about that is: each array comes with useful **methods** out of the box :)

The most simple example is getting the length of the array. You simply do:


```js
console.log(penguinNames.length) // logs 3
```

This tells you how many entries your array has: in this case 3. Try logging `somePenguins.length`. It works the same way even though in *that* case it's not just a list of strings, but an **array of objects**.

### Objects in JavaScript
Let's say we want to document some facts about one of our penguins. Let's put down where Rita lives and what type of penguin she is:
```js

let factsAboutRita = {species: "Adelie", island: "Dream"}
```

This time we enclosed our data in curly brackets `{}` and gave each entry a `key` and a `value`. Pretty neat to store data, right? 
There are a couple of functions that help us to access e.g. all keys in any given object. 
If we want to access a specific value we can also use the objects' name and the key via the dot-notation:

```js
console.log(factsAboutRita.species) // logs "Adelie"
```

### Interim recap
Great, now let's circle back to our array of objects to recap:

```js
let somePenguins = [
    {row: 1, species: "Adelie", island: "Torgersen"},
    {row: 2, species: "Adelie", island: "Biscoe"},
    {row: 3, species: "Chinstrap", island: "Torgersen"},
    {row: 4, species: "Gentoo", island: "Dream"},
    {row: 5, species: "Chinstrap", island: "Dream"},
  ];
```

The whole of `somePenguins` is an array that has useful methods that JavaScript offers us (more on that below). 
In addition this is also the kind of structure that svelte `{#each}` blocks need, so it's very useful if you want make great data visualizations with Svelte & D3.

Each entry in our array is an object. 
All of our objects can be thought of as the rows of our table. 
Inside these rows, we have the keys and values. 

This is more verbose than the spreadsheet-style that you might be used to, but it actually makes reading the data easier by eye and is more precise for coding.
What's more, an array of objects is the standard data representation that you will get if you read in external data with d3 via the [d3-fetch](https://github.com/d3/d3-fetch) or [d3-dsv](https://github.com/d3/d3-dsv) modules.
So it is a pretty standard way of representing data, especially in the context data visualizations for the web.

Next, we're gonna pull in the real dataset and then take a look at the vanilla Javascript functions that we can leverage to work with the data and answer some basic questions about the data.

### Get column names
Firstly, after loading our data, let's check out which facts about the penguins is actually captured in the dataframe by looking at the names of the columns. 
Remember that there is a way to access all keys in a given object?
That's exactly what we need to look at our column names!

```js

let columnNames = Object.keys(data[0]); 

console.log(columnNames); // logs ["species", "island", "bill_length_mm","bill_depth_mm","flipper_length_mm","body_mass_g","sex","year"]
```

Our column names are `species`, `island`, `bill_length_mm`, `bill_depth_mm`, `flipper_length_mm`, `body_mass_g`, `sex`, `year`
How did we get these? 
We combined an object and an array operation: `data[0]` will access the first row of our data aka the first object in our array. 
This single object is passed into the `keys()` function that gets us the keys in that object.

Or, as the MDN docs put it:

<Blockquote 
text = "The <code>Object.keys()</code> method returns an array of a given object's own enumerable string-keyed property names."
author="MDN Web Docs"
url="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys"/>

The column names give us a rough impression of what the data might be able to tell us. 
We know sth. about the type of penguin (`species`) and where they live (`island`). 
We also have some measurement of their bodily features, such as how long their `bills...` (aka beaks) and their `flippers...` (aka wings) are. 
Oh, and we know something about how much they weigh (`body_mass_g`). 
I'm not a penguin expert, but I suspect that we'll see differences in some of the bodily features if we compare the different species. 

Maybe we'll see that below?

### The number of observations

Next, let's see how many datapoints are actually included in our data.
You already know how to do this one: get the length of the array! 

```js

let datapoints = data.length; 

console.log(datapoints); // logs 344
```

There are 344 observations in total. 
This is a nice sample size that easily fits into memory and can be used to mess around with, say, data wrangling in vanilla javascript?

### Let's take a peek at the top 3 rows

Now, let's actually render some of the data to the screen. 
But not all of it. 
We don't want take up the whole screen or trap everything in a scrollable container. 
Instead, let's take a glimpse on the first 3 rows of the data to get a feel for it.
To do that we use a standard array method called `slice()`:

```js

let head = data.slice(0, 3); 
```

<Table data={head} />

Now you can view some sample data from our 344 observations for all of the columns (if you scroll a little).

Palmer Penguins Data were collected and made available by [Dr. Kristen Gorman](https://www.uaf.edu/cfos/people/faculty/detail/kristen-gorman.php) and the [Palmer Station, Antarctica LTER](https://pallter.marine.rutgers.edu/), a member of the [Long Term Ecological Research Network](https://lternet.edu/).

### Array methods to cover

1. [slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
2. [sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 
3. [splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
4. [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
5. [reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

