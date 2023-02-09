---
title: 'Basic Data Manipulation in Javascript'
date: '2022-12-07'
categories:
  - 'javascript'
  - 'data'
  - 'basics'
---

<script>
  import Table from '$lib/components/posts/TableView.svelte';
  import TOC from '$lib/components/posts/TOC.svelte';
  import { maxByKey } from '$lib/assets/js/utils';
  import Bar from '$lib/components/posts/Bar.svelte';
  import Embed from '$lib/components/EmbedIFrame.svelte';

  import data from './data.json';

  let somePenguins = [
    {row: 1, species: "Adelie", island: "Torgersen"},
    {row: 2, species: "Adelie", island: "Biscoe"},
    {row: 3, species: "Chinstrap", island: "Torgersen"},
  ];

  let penguinSpecies = ["Adelie", "Adelie", "Chinstrap"];

  let head = data.slice(0, 3); 

  let speciesSet = new Set(penguinSpecies);

  let bodyMassGrams = [3750, 3800, 3250];

  let bodyMassKiloGrams = bodyMassGrams.map(x => x / 1000);
  
  let distinctSpecies = [...new Set(data.map(row => row.species))]; 

  let countGentoo = data.reduce((counter, row) => {
		if (row.species === "Gentoo") counter += 1
		return counter;
		}, 0);

  let smolData = data.map(row => {
    return {
      species: row.species,
      body_mass_g: +row.body_mass_g
    }
  });

  let maxValues = maxByKey(smolData, "species", "body_mass_g")
    .sort((a, b) => a.body_mass_g - b.body_mass_g);
</script>



<TOC>

- [A basic dataset](#a-basic-dataset)
- [Arrays in JavaScript](#arrays-in-javascript)
- [Objects in JavaScript](#objects-in-javascript)
- [Interim recap](#interim-recap)
- [Get column names](#get-column-names)
- [Get the number of observations](#get-the-number-of-observations)
- [Get a subset of rows](#get-a-subset-of-rows)
  - [Case 1: Slice the head of your data](#case-1-slice-the-head-of-your-data)
  - [Case 2: Filter by condition](#case-2-filter-by-condition)
- [Check distinct values](#check-distinct-values)
  - [Ingredient 1: Set()](#ingredient-1-set)
  - [Ingredient 2: map()](#ingredient-2-map)
  - [The whole deal: Set() + map()](#the-whole-deal-set--map)
- [Count frequency of distinct values](#count-frequency-of-distinct-values)
  - [Reduce to sum](#reduce-to-sum)
  - [Count Gentoo](#count-gentoo)
  - [A counting function](#a-counting-function)
- [Sort the data](#sort-the-data)
  - [Ascending vs. descending order](#ascending-vs-descending-order)
- [Mutate, select, rename columns](#mutate-select-rename-columns)
  - [1: Mutate to add a new column](#1-mutate-to-add-a-new-column)
  - [2: Select columns](#2-select-columns)
  - [3: Rename columns](#3-rename-columns)
- [Drumroll](#drumroll)
  - [Svelte REPL](#svelte-repl)
  - [Datawrapper Map](#datawrapper-map)
  - [Datawrapper Chart](#datawrapper-chart)
- [About the data](#about-the-data)
- [Array methods to cover](#array-methods-to-cover)
- [Math methods](#math-methods)

</TOC>


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

It tells you something about 3 penguins. You'll learn more about these penguins and where they live below when we dig into the real data set. Spoiler alert: they were observed by researchers in the Palmer Archipelago, Antarctica.

In the table above, we only have 3 rows, each with a `row` number and two more columns that tell us something about the penguins' `species` and their home `island`. This is the typical spreadsheet-like representation that most of us have in mind, esp. when coming from a background of `data.frame` and `tibble` in R or `pd.DataFrame` in Python. 
But what does the typical JavaScript representation look like?

Here are the lines I wrote to define the data in the table above:

```js
let somePenguins = [
    {row: 1, species: "Adelie", island: "Torgersen"},
    {row: 2, species: "Adelie", island: "Biscoe"},
    {row: 3, species: "Chinstrap", island: "Torgersen"},
  ];
```

Notice how it is basically the same, but more verbose. Why do I say verbose? If you compare the table and the code block, you'll notice that the row numbers run from 1 to 3 and they're all visually aligned in a column. The difference is, that in the table, the column name `row` is *not repeated*. Same for the other two columns: if you focus on the data entries highlighted in green, you see the same as in the familiar spreadsheet-style table.

But let's dig a little deeper into this simple code block. Technically speaking `somePenguins` is an **array of objects**. This is important, because it tells us what kind of functions/methods we can use to work with this data.

If you're new to JavaScript and you're not sure what an **array** and an **object** is... Well you've come to the right place! I'll point out the most important basics and link to further resources for you to go through.

### Arrays in JavaScript
An array is just a convenient way to store of similar things under the a single variable name. Like this:

```js
let penguinSpecies = ["Adelie", "Adelie", "Chinstrap"];
```

See, by enclosing the list of items in square brackets `[]` JavaScript registers this as an array. And the nice thing about that is: each array comes with useful **methods** out of the box.
We'll use the most common ones below to learn about our penguin data.

The most simple example is getting the length of the array. You simply do:


```js
console.log(penguinSpecies.length) // logs 3
```


This tells you how many entries your array has: in this case 3. Try logging `somePenguins.length`. It works the same way even though in *that* case it's not just a list of strings, but an **array of objects**.

<Accordion summary="Why not .length()?">

Technically speaking, `.length` is a ***property*** and not a **method**.
That is to say, it is not a function that you can call, but rather a property that gets updated automagically to keep track of the arrays size.

- [length in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
  
</Accordion>

### Objects in JavaScript
To showcase an object, let's create one.
Let's say we want to document some facts about one of our penguins. Let's put down where Rita lives and what type of penguin she is:
```js
let factsAboutRita = {species: "Adelie", island: "Dream"}
```

This time we enclosed our data in curly brackets `{}` and gave each entry a `key:` and a `value`. Pretty neat to store data, right? 
There are a couple of functions that help us to access e.g. all keys in any given object. 

<Accordion summary="Keys and values">

- [keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys): The Object.keys() method returns an array of a given object's own enumerable string-keyed property names.
- [values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values): The Object.values() method returns an array of a given object's own enumerable string-keyed property values.
  
You'll see `keys()` in action in just a minute.
</Accordion>

If we want to access a specific value we can use the objects' name and the key via the dot notation:

```js
console.log(factsAboutRita.species) // logs "Adelie"
```

<Accordion summary="Bracket notation">

Bracket notation provides an alternative way to access object properties.

```js
console.log(factsAboutRita["species"]) // logs "Adelie" too
```

I'll continue to use the dot notation in the examples below, because it's easier to type and more common in general.

You can see a comparison of both notations on [MDN here](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics#dot_notation).
</Accordion>

### Interim recap
Great, now let's circle back to our array of objects to recap:

```js
let somePenguins = [
    {row: 1, species: "Adelie", island: "Torgersen"},
    {row: 2, species: "Adelie", island: "Biscoe"},
    {row: 3, species: "Chinstrap", island: "Torgersen"},
  ];
```

The whole of `somePenguins` is an **array** that has useful methods that JavaScript offers us (more on that below). 

Each entry in our array is an **object**. 
All of our objects can be thought of as the rows of our table. 
Inside these rows, we have the key and value pairs. 

This data representation is more verbose than the spreadsheet-style that you might be used to, but it actually makes reading the data easier by eye and is more precise for coding.
What's more, an array of objects is the standard data representation that you will get if you read in external data with d3 via the [d3-fetch](https://github.com/d3/d3-fetch) or [d3-dsv](https://github.com/d3/d3-dsv) modules.
So it is a pretty standard way of representing data, especially in the context data visualizations for the web.
In addition, an array is also the kind of structure that svelte `{#each}` blocks need, so it's very useful if you want make great data visualizations with Svelte & D3.

Next, we're gonna pull in the real dataset and then take a look at the vanilla JavaScript functions that we can leverage to work with the data and answer some basic questions about the data.

### Get column names
Firstly, after loading our data, let's check out which facts about the penguins are actually captured in the dataframe by looking at the names of the columns. 
Remember that there is a way to access all keys in a given object?
That's exactly what we need to get our column names!

```js
let columnNames = Object.keys(data[0]); 

console.log(columnNames); // logs ["species", "island", "bill_length_mm","bill_depth_mm","flipper_length_mm","body_mass_g","sex","year"]
```

Our column names are `species`, `island`, `bill_length_mm`, `bill_depth_mm`, `flipper_length_mm`, `body_mass_g`, `sex`, `year`
How did we get these? 
We combined an object and an array operation: `data[0]` will access the first row of our data aka the first object in our array. 
This single object is passed into the `keys()` function that gets us the keys in that object.

The column names give us a rough impression of what the data might be able to tell us. 
We know sth. about the type of penguin (`species`) and where they live (`island`). 
We also have some measurement of their bodily features, such as how long their `bills...` (aka beaks) and their `flippers...` (aka wings) are. 
Oh, and we know something about how much they weigh (`body_mass_g`). 
I'm not a penguin expert, but I suspect that we'll see differences in some of the bodily features if we compare the different species. 

Maybe we'll see that below?

### Get the number of observations

Next, let's see how many datapoints are actually included in our data.
This is a simple sanity check that is useful for at least two things: 
1. if you already know how big your dataset is, this let's you check if reading in the data actually worked as expected. 
2. If you don't have any clue about the data, this gets you a feel for how large the dataset is that you're about to work with.

You already know how to do this one: get the length of the array! 

```js
let observations = data.length; 

console.log(observations); // logs 344
```

There are 344 observations in total. 
This is a nice sample size that easily fits into memory and can be used to mess around with, say, data wrangling in vanilla JavaScript?

### Get a subset of rows
There are many reasons why you might want to get a subset of rows from your table.
The two most frequent reasons might be these:
1. You want to get *some kind subset* to peek inside your data without being overwhelmed by rendering *all of it*.
2. You want to get a *specific subset* to e.g. visualize/work on separately from the rest.


#### Case 1: Slice the head of your data
In the previous steps you learned about the column names and how many observations are included in total.
Now, let's actually render some of the data to the screen. 
But not all of it, because we don't want take up the whole screen or trap everything in a giant scrollable container. 
Instead, let's take a glimpse on the first 3 rows of the data to get a feel for it.

We take a look at the *head* of the body of data...
To do that we use a standard array method called `slice()`:

```js
let head = data.slice(0, 3); 
```

Pretty straightforward: we take our data and literally slice it. 
How much do we cut out? 
From the first row up until and including the third row. 
Two things to note here: Firstly, JavaScript is 0-indexed, so the first row has the index of 0. 
Secondly, the number specifying the end of our slice is *not* included!

The result looks like this: 

<Table data={head} />

 
Now you can view some sample data from a subset of our 344 observations for all of the 8 columns (if you scroll a little). 
You could even log this to your console, if you just wanted to take a quick peek.
Or you can use slice to create a nice and small subset to start sketching out a data visualization (for that it might be a good idea to increase the number of rows to more than 3 when calling slice).
Starting out with a subset, where you more or less know the datapoints let's you create a draft viz and then iterate from there.

<Accordion summary="Further resources on slice()">

- [slice() in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  
</Accordion>

But sometimes you might be interested in a *particular subset* of your data.
For that scenario, slice is not useful.

#### Case 2: Filter by condition
Let's say you are interested in what penguins Rita hangs out with on their home island called *Dream Island*.
To find out more about *Dream Island*, let's get all observations where `island === "Dream"`.

```js
let dreamIsland = data.filter(row => row.island === "Dream");

console.log(dreamIsland.length); // logs 124
```
You can read this as: take the data and filter it. For each row, check if the variable called `island` is equal to `"Dream"`. If so, include in the output. 
Nice and simple, right? 
Now you can work with the data that is specificly about the data from *Dream Island*.

I'm not rendering these to the screen, but you can see that 124 out of the 344 observations are about penguins from *Dream Island*.

<Accordion summary="Bonus: Filter by multiple conditions">

Do you want to filter by multiple conditions in one call? Easy:


```js
let dreamIslandAdelie = data.filter(row => row.island === "Dream" && row.species === "Adelie");

console.log(dreamIslandAdelie.length); // logs 56
```



Further information on [the logical AND (&&) in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND).

</Accordion> 

<Accordion summary="Further resources on filter()">

- [slice() in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  
</Accordion>


### Check distinct values
Especially for categorical data it is useful to know how many distinct values there are for a given variable.
In our case, let's take a look at the distinct penguin species that the researchers observed.
We'll use a combination of `Set()` and `map()` to achieve that.

#### Ingredient 1: Set()
<Blockquote 
text = "The <code>Set</code> object lets you store unique values of any type, whether primitive values or object references."
author="MDN Web Docs"
url="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set"/>

So, we'll take advantage of the fact that a **Set** only retains **unique values**.
Let's pull back our simple example array and then use it create a Set from it before we advance to an example that uses our big dataset. 

```js
// our original array has 3 entries, but only 2 of them are unique
let penguinSpecies = ["Adelie", "Adelie", "Chinstrap"];

// when we create a set from that array...
let speciesSet = new Set(penguinSpecies);

console.log(speciesSet); // logs ["Adelie", "Chinstrap"]
```

Now, isn't *that* convenient? All we need now is a way to go through all entries in our array and inside each entry, visit our variable of interest. 
Sure, we can write a for-loop, but there is nice array method to do this more succinctly for us.
This is where `map()` comes in to save your day!

#### Ingredient 2: map()

Here is a super-duper simple example of what `map()` can do:

```js
// starting out with our weights in grams
let bodyMassGrams = [3750, 3800, 3250];

// using map() to convert to kilograms
let bodyMassKiloGrams = bodyMassGrams.map(x => x / 1000);

console.log(bodyMassKiloGrams); // logs [ 3.75, 3.8, 3.25 ]
```

Simple: for each entry in our array, divide it by 1000 and then save the result to a new array.
Nice, now we put Set() and map() together to finally retrieve our distinct species values.

#### The whole deal: Set() + map()

```js
let distinctSpecies = [...new Set(data.map(row => row.species))]; 

console.log(distinctSpecies); // logs ["Adelie", "Gentoo", "Chinstrap"]
```

Yay! There is a little more going on here than we encountered before, so let's unpack it a bit.
We take our array called *data* and use `map()` to visit each entry in it.
Each entry is an object that we can nickname *row* to refer to its relation in the spreadsheet-style image.
Inside each of the rows, we visit the *species*-variable via dot notation.
Lastly, we put whatever value we find inside the species-variable into a *Set* object.
As we learned above, Set actually takes care of only storing unique values, so duplicate entries are simply not added to the resulting Set.

That's it! We found the distinct values in our species-variable!
Doing the same for the islands is trivial now...

<Accordion summary="Further resources on map()">

- [map() in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [a great intro video to map() by The Coding Train](https://www.youtube.com/watch?v=EnYlhbpzhU4)
  
</Accordion>

### Count frequency of distinct values

Now that we know there are only 3 species in our dataset, an obvious next question is: how many of the 344 observations does each of the 3 species account for?

Let's first do it for just one species to understand what kind of operation is needed for this task and afterwards look at all species.

Out of the 3 species at hand, *Gentoo* sounds like the most fun to me, so we'll count these first.
Basically, we want to take the array and summarize the number of appearances of *Gentoo*. Another way of saying the same is: we want to *reduce* the array (many observations) to a single value (number of *Gentoo* penguins).

Drumroll..

<Blockquote 
text = "The <code>reduce()</code> method executes a user-supplied 'reducer' callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value."
author="MDN Web Docs"
url="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce"/>

To introduce reduce, I'll reach to a standard example: computing the sum of *something*.
Let's make it really simple.

#### Reduce to sum

```js
let bodyMassGrams = [3750, 3800, 3250];

let initialValue = 0;

let bodyMassSum = bodyMassGrams.reduce(
  (accumulator, currentValue) => accumulator + currentValue, initialValue
  );

console.log(bodyMassSum) // logs 10800
```



This code takes the array of 3 numbers and adds them up together.
It goes through the array, takes the *last value* (accumulator) and adds the *current value* to it.
Because we specify an *initial value*, this will be the first value that accumulator takes.
*Current value* will be 3750 and the sum of both is also 3750.
Moving on to the next step, *now* accumulator is 3750 and *current value* is 3800 and so on and so on.

<Accordion summary="Under the hood of reduce()">

Curious to see how *accumulator* and *current value* change while reduce() works through the array?
What do you think happens when you omit an initial value?
Run this code to find out!


```js
let bodyMassGrams = [3750, 3800, 3250];

// this function will do the summation-part and log all values
function logger(accumulator, currentValue, index) {
  const returns = accumulator + currentValue;
  console.log(
    `index: ${index}, 
    accumulator: ${accumulator}, 
    currentValue: ${currentValue}, 
    returns: ${returns}
==============================`,
  );
  return returns;
}

// run the reduce-logger to see whats inside
bodyMassGrams.reduce(logger);
```

  

Notice how reduce starts at index 1! Try changing the last line to `bodyMassGrams.reduce(logger, 0);` to add an initial value and see what happens.

</Accordion>


Back to our data (an array of objects, remember?). Let's count all those *Gentoo* penguins with the help of reduce:

#### Count Gentoo


```js
let initialValue = 0;

let countGentoo = data.reduce((counter, row) => {
  if (row.species === "Gentoo") counter += 1
  return counter;
  }, initialValue);

console.log(countGentoo); // logs 124
```

Voilá! We have 124 *Gentoo* penguins in our dataset.

I deviated from the traditional variable names here, because basically what we do is **counting**. And since we're iterating through the rows of our table (aka the objects inside our array), I use *row* to refer to the current *object*. 
For each row, inside the species variable, check if that is equal to "Gentoo". 
**If** so, increase our counter accumulator by 1. Return the counter when the whole array is processed.

But! If we want to do the same for the other two species, we'd have to repeat that code...
Instead, let's quickly make that a function that we can re-use.

#### A counting function

```js
function speciesCounter(data, species) {
  return data.reduce((counter, row) => {
    if (row.species === species) counter += 1
    return counter;
  }, 0);
};

const countGentooToo = speciesCounter(data, "Gentoo");
console.log(countGentooToo); // logs 124 too
```

Now you can easily do the same for the other 2 species. Have a play with it.

<Accordion summary="Bonus: Count all at once">

Do you want to be extra-efficient? Thanks to [Leigh Halliday's tutorial video](https://www.youtube.com/watch?v=NiLUGy1Mh4U), I give you a more advanced way to count all species at the same time.


```js
let countAll = data.reduce((acc, row) => {
  	return { ...acc, [row.species]: (acc[row.species] || 0) + 1 };
	}, {});

console.log(countAll); // logs  { Adelie: 152, Gentoo: 124, Chinstrap: 68 }
```


Please check out the video, where Leigh does an amazing job at explaining this super concise code. He does his example with people rather than penguins, but it's the same logic.

</Accordion> 

<Accordion summary="Why is everybody using 'accumulator'?">

The variable-name `accumulator` or the shorter version `acc` is a very common choice for JavaScript's reduce(). When I first encountered reduce(), I saw lts of examples that always used `(acc, cur)` and I honestly found it not very intuitive. 

<hr>

The main take-away is this: the whole idea of the reduce() function is to go from many values to a single value. The way to get there is to work with some sort of *last value* and *current value* that can be used to compute stuff with. It so happens that a majority of persons is calling the *last value* the `accumulator`, because it **persists** and is **updated** while iterating through all values. In contrast, the *current value*, often called `cur` is simply updated to the value at hand.


In our example above, `accumulator` is literally *accumulating* all values by adding them, one by one.
  
</Accordion>

<Accordion summary="Further resources on reduce()">

- [reduce() in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [a great intro video to reduce() by Leigh Halliday](https://www.youtube.com/watch?v=NiLUGy1Mh4U)
  
</Accordion>


### Sort the data
Another common thing you might want to do with your data is sorting it. 
Say you want to make sure the penguins with the lowest body mass are listed first in your data.
How would go about that?
While there is a native array method called `sort()`, I'm showing this rather late in this post, because I find it to be surprisingly complex (there are two things to discuss).
Here is the code you'd probably write first:

```js
// don't do this: 
let sorted = data.sort((a, b) => a.body_mass_g - b.body_mass_g);
```

If you inspect the `sorted` data, you'll find it is indeed sorted as expected.

<div class="huge">
BUT!
</div>

There's a big *BUT*.
Try logging this and be surprised:

```js
// the original is sorted as well!
console.log(sorted === data) // logs "true"
```

If we simply call `data.sort(...)` we're *sorting in place*.
That's fine if you know what you're doing and you don't need to preserve the original order in your data.
**But even if you assign your sorted array to a new variable, the original will be sorted *as well*!**

<Accordion summary="If you actually do want to sort in place...">

...you don't need to assign to a new variable and instead can just call sort() on your data like so:

```js
data.sort((a, b) => a.body_mass_g - b.body_mass_g);
```
</Accordion>

Here is the code you need to create *a new array* with the sorted values.

```js
// this creates a new sorted copy
let sorted = [...data].sort((a, b) => a.body_mass_g - b.body_mass_g);
```

We use a neat little trick to **first** copy the array via spread syntax `[...data]` and **then** sort *that new copy* in place and assign it to our new variable `sorted`. 

<Accordion summary="Alternative to the Spread syntax '...'">

Another way to create a copy and then sort the copied array is to use slice() without arguments:

```js
// this creates a new sorted copy
let sorted = [...data].sort((a, b) => a.body_mass_g - b.body_mass_g);

// same:
let slicedSorted = data.slice().sort((a, b) => a.body_mass_g - b.body_mass_g);

console.log(sorted === slicedSorted) // logs "true"
```
  
Pick your poison.
In my humble opinion both are ok, but I would find it more intuitive if sort() simply returned a new array (like map() and filter() do.)
</Accordion>

#### Ascending vs. descending order
The obvious question right now is: why do we need to write this `a - b` stuff?
Sort() expects a *compare function* that specifies *what* should be sorted and *how* it should be sorted.
It boils down to this: 
1. If the *compare function* returns a *positive number* then `a` is sorted *after* `b`. 
2. If the *compare functions* returns a *negative number* then `a` is sorted *before* `b`.

Let's walk through a simplified example to try to understand this:

```js
// simple array
let bodyMassGrams = [3750, 3800, 3250];

// sorted array
bodyMassGrams.sort((a,b) => a - b)
```

What is happening?
Let's take this array of 3 values and think through what is compared and how that will affect the sorting.
In the table below I list the comparison, the numerical result, and the effect on sorting the elements.

<div class="table-wrapper" >

| comparison |    result | effect |
|------------|-----------|--------|
| a: 3750 - b: 3800 =| -50 | 3750 is sorted *before* 3800 |
| a: 3800 - b: 3250 =| 550 | 3800 is sorted *after* 3250 |
| a: 3750 - b: 3250 =| 500 | 3750 is sorted *after* 3250 |

</div>

Now all values have been compared to each other and the order has been established!
The first comparison yields a *negative number*, so `a: 3750` is sorted *before* `b: 3800`.
The other two comparisons both yield a *positive number*, because `3800` and `3750` are both greater than `3250`...

In case this still does not make sense to you right now I encourage you to watch the video by The Coding Train that I link to below.
Daniel makes an incredible job (again) at explaining and showcasing sort().

<Accordion summary="Further resources on sort() and '...'">

- [a great intro video to sort() by The Coding Train](https://www.youtube.com/watch?v=MWD-iKzR2c8)
- [sort() in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
  - see their [example on using sort() + spread syntax here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#sort_returns_the_reference_to_the_same_array)
- [Spread syntax (...) in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
  
</Accordion>

<Accordion summary="Hey, what about descending?">

Yep, you got me there. But it's simple:

```js
// simple array
let bodyMassGrams = [3750, 3800, 3250];

// sorted array (ascending)
bodyMassGrams.sort((a,b) => a - b)

// sorted array (descending)
bodyMassGrams.sort((a,b) => b - a)
```

Or you use a helper function like this to make it more explicit:

```js

function compareValues(order = "asc") {
  return function innerSort(a, b) {

    let comparison = 0;
    if (a > b) {
      comparison = 1;
    } else if (a < b) {
      comparison = -1;
    }
    return (
      (order === "desc") ? (comparison * -1) : comparison
    );
  };
}

// default: ascending
let asc = [...bodyMassGrams].sort(compareValues("asc"));

// descending on demand
let desc = [...bodyMassGrams].sort(compareValues("desc"));
```

</Accordion>



### Mutate, select, rename columns
We're gonna finish this off with a roundhouse-kick of data manipulations. 
Adding a new column based on existing ones? Got ya!
Renaming existing columns? Easy!
Selecting columns to boil down the amount of data? Totally!

And ***all these*** can be done with the help of our trusty map() function!

#### 1: Mutate to add a new column

Let's jump right in and re-use the map()-example from above, but this time applying the conversion of grams to kilograms to all 344 observations.

```js
// convert from grams to kilograms for all entries
let dataWithKG = data.map(row => {
    return {
      body_mass_kg: row.body_mass_g / 1000
    }
  });
```

As with the other use of map() above, this let's us visit each entry in our array called `data`.
Inside each of those entries (*or rows of our table*), we define a new pair of `key:` and `value`.
Sticking to the variable-naming convention of this dataset, we call our new colum `body_mass_kg` and define the values with the simple computation for each of the `row.body_mass_g`.
Notice that we `return` an **object** by wrapping our simple computation in curly bois `{}`.
If you console.log() the result of this operation, you'll see that we successfully converted all entries in our rows from grams to kilograms.
But you'll also notice that all the other columns are gone.
That's a shame isn't it? Luckily, it's easy to preserve them all with another friend: the spread syntax.

```js
// convert from grams to kilograms for all entries
// and preserve existing columns
let dataWithKG = data.map(row => {
    return {
      ...row, 
      body_mass_kg: row.body_mass_g / 1000
    }
  });
```

And just like that you have all other variables preserved as well.

<Accordion summary="I noticed something about the new column!">

If you logged this one out too and looked at the output closely, you probably noticed that all the old variables are shown as `'strings'`, while the new column is rendered as a `number`.
(Depending on your setup/browser etc. the look of it might vary.)

Well, yes! That's because I'm lazy. _**All** the data_ in the original array of objects are strings.

If you want to clean up my mess, you can use this little trick to convert any of the columns to numerical values too, that actually *should be* formatted that way.
You'll have to specify which columns you want to convert inside map() like this:

```js
let dataWithNumerics = data.map(row => {
    return {
      // previous code:
      ...row, 
      body_mass_kg: row.body_mass_g / 1000,
      // conversions:
      body_mass_g: +row.body_mass_g,
      bill_length_mm: +row.bill_length_mm,
      bill_depth_mm: +row.bill_depth_mm,
      flipper_length_mm: +row.flipper_length_mm,
      year: +row.year
    }
  });
```
  
It looks weird, I know. But this is a very common pattern you'll see frequently in the wild to convert from strings to numbers.
It uses the unary plus operator, which is *"the fastest and preferred way of converting something into a number, because it does not perform any other operations on the number"*.

- [Unary plus (+) in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus)


</Accordion>

#### 2: Select columns

Going from many columns to a selection of a few needed columns is a piece of cake now.
Let's say we want to visualize `body_mass_g` by `species`. 
Let's make a new, smaller array of objects that only contains those two columns. 

```js
let smolData = data.map(row => {
    return {
      species: row.species,
      body_mass_g: +row.body_mass_g
    }
  });
```

If we then reduce our values to only retain the highest values per species, we can see who is the largest:

<Bar data={maxValues} title="Heaviest Penguins by Species" description="Bar-Chart showing the heaviest penguin per species in grams."/>


#### 3: Rename columns

I think you can guess by now how to rename a column. 
Nobody is stopping you from just using a different `key:` inside your map() call.
So we can just replace `species` and `body_mass_g` with whatever floats your boat.

```js
let smolData = data.map(row => {
    return {
      type: row.species,
      mass: +row.body_mass_g
    }
  });
```

Keep in mind that special characters should be avoided here. 
If you stick to *just letters*, you're fine.
Technically, you could also go crazy and use something like `"I need some space":` as your `key:`, but you'll have other problems down the road then, like not being able to use the dot-notation to access your rows (`row.I need some space` will not work).

### Drumroll
Look, I can embed stuff now!

#### Svelte REPL
<Embed 
  src="https://svelte.dev/repl/8f58c81037234683ac1a344da8d859f2?version=3.55.1" 
  title="An embedded Svelte REPL"
/>

#### Datawrapper Map
<Embed 
  src="https://datawrapper.dwcdn.net/S5MFr/2/" 
  title="This is where the penguins live"  
  scrolling="no"
/>

#### Datawrapper Chart
<Embed 
  src="https://datawrapper.dwcdn.net/16Hga/2/" 
  title="Look at this chart!"
  height="900"
/>

### About the data

Palmer Penguins Data were collected and made available by [Dr. Kristen Gorman](https://www.uaf.edu/cfos/people/faculty/detail/kristen-gorman.php) and the [Palmer Station, Antarctica LTER](https://pallter.marine.rutgers.edu/), a member of the [Long Term Ecological Research Network](https://lternet.edu/).

### Array methods to cover

1. [slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
2. [sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 
3. [splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
4. [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
5. [reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

### Math methods
1. [sign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign)
2. [round()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
3. [random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
4. [min()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min)
5. [floor()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
6. [abs()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs)

