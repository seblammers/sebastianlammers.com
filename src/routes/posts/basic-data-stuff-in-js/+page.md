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
  ];

  let penguinSpecies = ["Adelie", "Adelie", "Chinstrap"];

  let head = data.slice(0, 3); 

  let speciesSet = new Set(penguinSpecies);

  let bodyMassGrams = [3750, 3800, 3250];

  let bodyMassKiloGrams = bodyMassGrams.map(x => x / 1000);
  
  let distinctSpecies = [...new Set(data.map(row => row.species))]; 

  let countGentoo = data.reduce((counter, row) => {
		if (row.species === 'Gentoo') counter += 1
		return counter;
		}, 0);

  
  console.log(countGentoo);
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
  ];
```

Notice how it is basically the same, but more verbose. Why do I say verbose? If you compare the table and the code block, you'll notice that the row numbers run from 1 to 3 and they're all visually aligned in a column. The difference is, that in the table, the column name `row` is not repeated. Same for the other two columns: if you focus on the data entries highlighted in green, you see the same as in the familiar spreadsheet-style table.

But let's dig a little deeper into this simple code block. Technically speaking `somePenguins` is an **array of objects**. This is important, because it tells us what kind of functions/methods we can use to work with this data.

If you're new to JavaScript and you're not sure what an **array** and an **object** is... Well you've come to the right place! I'll point out the most important basics and link to further resources for you to go through.

### Arrays in JavaScript
An array is just a convenient way to store of similar things under the a single variable name. Like this:

```js
let penguinSpecies = ["Adelie", "Adelie", "Chinstrap"];
```

See, by enclosing the list of items in square brackets `[]` JavaScript registers this as an array. And the nice thing about that is: each array comes with useful **methods** out of the box :) 
We'll use the most common ones to learn about our data below.

The most simple example is getting the length of the array. You simply do:


```js
console.log(penguinSpecies.length) // logs 3
```


This tells you how many entries your array has: in this case 3. Try logging `somePenguins.length`. It works the same way even though in *that* case it's not just a list of strings, but an **array of objects**.

<Accordion summary="Why not .length()?">

Technically speaking, `.length` is a ***property*** and not a **method**.
That is to say, it is not a function that you can call, but simply a property that gets updated automagically to keep track of the arrays size.
  
</Accordion>

### Objects in JavaScript
Let's say we want to document some facts about one of our penguins. Let's put down where Rita lives and what type of penguin she is:
```js
let factsAboutRita = {species: "Adelie", island: "Dream"}
```

This time we enclosed our data in curly brackets `{}` and gave each entry a `key` and a `value`. Pretty neat to store data, right? 
There are a couple of functions that help us to access e.g. all keys in any given object. 

<Accordion summary="Keys and values">

- [keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys): The Object.keys() method returns an array of a given object's own enumerable string-keyed property names.
- [values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values): The Object.values() method returns an array of a given object's own enumerable string-keyed property values.
  
You'll see `keys()` in action in just a minute.
</Accordion>

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
  ];
```

The whole of `somePenguins` is an array that has useful methods that JavaScript offers us (more on that below). 
In addition this is also the kind of structure that svelte `{#each}` blocks need, so it's very useful if you want make great data visualizations with Svelte & D3.

Each entry in our array is an object. 
All of our objects can be thought of as the rows of our table. 
Inside these rows, we have the key and value pairs. 

This data representation is more verbose than the spreadsheet-style that you might be used to, but it actually makes reading the data easier by eye and is more precise for coding.
What's more, an array of objects is the standard data representation that you will get if you read in external data with d3 via the [d3-fetch](https://github.com/d3/d3-fetch) or [d3-dsv](https://github.com/d3/d3-dsv) modules.
So it is a pretty standard way of representing data, especially in the context data visualizations for the web.

Next, we're gonna pull in the real dataset and then take a look at the vanilla Javascript functions that we can leverage to work with the data and answer some basic questions about the data.

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
This is a nice sample size that easily fits into memory and can be used to mess around with, say, data wrangling in vanilla javascript?

### Get a subset of rows

Now, let's actually render some of the data to the screen. 
But not all of it, becuase we don't want take up the whole screen or trap everything in a giant scrollable container. 
Instead, let's take a glimpse on the first 3 rows of the data to get a feel for it.
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

 
Now you can view some sample data from our 344 observations for all of the 8 columns (if you scroll a little). 
You could even log this to your console, if you just wanted to take a quick peek.
Or you can create a nice and small subset to start sketching out a data visualization.
Starting out with a subset, where you more or less know the datapoints let's you create a draft viz and then iterate from there.

<Accordion summary="Further resources on slice()">

- [slice() in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  
</Accordion>

### Check distinct values
Especially for categorical data it is useful to know how many distinct values there are for a given variable.
In our case, let's take a look at the distinct penguin species that the researchers observed.
We'll use a combination of `Set()` and `map()` to achieve that.

<Blockquote 
text = "The <code>Set</code> object lets you store unique values of any type, whether primitive values or object references."
author="MDN Web Docs"
url="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set"/>

So, we'll take advantage of the fact that a **set** only retains **unique values**.
Let's pull back our simple example array and then use it create a set from it. 

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

Here is a super-duper simple example of what `map()` can do:

```js
// starting out with our weights in grams
let bodyMassGrams = [3750, 3800, 3250];

// using map() to convert to kilograms
let bodyMassKiloGrams = bodyMassGrams.map(x => x / 1000);

console.log(bodyMassKiloGrams); // logs [ 3.75, 3.8, 3.25 ]
```

Simple: for each entry in our array, divide it by 1000 and then save the result to a new array.
Nice, now we put set and map together to finally retrieve our distinct species values:

```js
let distinctSpecies = [...new Set(data.map(row => row.species))]; 

console.log(distinctSpecies); // logs ["Adelie", "Gentoo", "Chinstrap"]
```

Yay! There is a little more going on here than we encountered before, so let's unpack it a bit.
We take our array called *data* and use `map()` to visit each entry in it.
Each entry is an object that we can nickname *row* to refer to its relation in the spreadsheet-style image.
Inside each of the rows, we visit the *species*-variable via dot-notation.
Lastly, we put whatever value we find inside the species-variable into a *set* object.
As we learned above, set actually takes care of only storing unique values, so duplicate entries are simply not added to the resulting set.

That's it! We found the distinct values in our species-variable!
Doing the same for the islands is trivial now...

<Accordion summary="Further resources on map()">

- [map() in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [a great intro video to map() by The Coding Train](https://www.youtube.com/watch?v=EnYlhbpzhU4)
  
</Accordion>

### Count frequency of distinct values

Now that we know there are only 3 species in our dataset, an obvious next question is: how many of the 344 observations does each of the 3 species account for?

Let's first do it for just one species to understand what kind of operation is needed for this task.
Out of the 3 species at hand, *Gentoo* sounds like the most fun to me, so we'll count these first.
Basically, we want to take the array and summarize the number of appearances of *Gentoo*. Another way of saying the same is: we want to *reduce* the array (many observations) to a single value (number of *Gentoo* penguins).

Drumroll..

<Blockquote 
text = "The <code>reduce()</code> method executes a user-supplied 'reducer' callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value."
author="MDN Web Docs"
url="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce"/>

To introduce reduce, I'll reach to a standard example: computing the sum of *something*.
Let's make it really simple:

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
<br>

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

<br>  

Notice how reduce starts at index 1! Try changing the last line to `bodyMassGrams.reduce(logger, 0);` to add an initial value and see what happens.

</Accordion>


Back to our data (an array of objects, remember?). Let's count all those *Gentoo* penguins with the help of reduce:


```js
let initialValue = 0;

let countGentoo = data.reduce((counter, row) => {
  if (row.species === 'Gentoo') counter += 1
  return counter;
  }, initialValue);

console.log(countGentoo); // logs 124
```

I deviated from the traditional variable names here, because basically what we do is **counting**. And since we're iterating through the rows of our table (aka the objects inside our array), I use *row* to refer to the current *object*. <br>
For each row, inside the species variable, check if that is equal to "Gentoo". If so, increase our counter accumulator by 1. Return the counter when the whole array is processed.

But! If we want to do the same for the other two species, we'd have to repeat that code...
Instead, let's quickly make that a function:

```js
function speciesCounter(data, species) {
  return data.reduce((counter, row) => {
    if (row.species === species) counter += 1
    return counter;
  }, 0);
};

const countGentooFunction = speciesCounter(data, "Gentoo");
console.log(countGentooFunction); // logs 124 too
```

Now you can easily do the same for the other 2 species. Have a play with it.

<Accordion summary="Bonus: Count all at once">

Do you want to be extra-efficient? Thanks to [Leigh Halliday's tutorial video](https://www.youtube.com/watch?v=NiLUGy1Mh4U), I give you a more advanced way to count all species at the same time.
<br>

```js
let countAll = data.reduce((acc, row) => {
  	return { ...acc, [row.species]: (acc[row.species] || 0) + 1 };
	}, {});

console.log(countAll); // logs  { Adelie: 152, Gentoo: 124, Chinstrap: 68 }
```

<br>
Please check out the video, where Leigh does an amazing job at explaining this super concise code.

</Accordion> 

<Accordion summary="Why is everybody using 'accumulator'?">

The variable-name `accumulator` or the shorter version `acc` is a very common choice for Javascript's reduce(). When I first encountered reduce(), I saw lts of examples that always used `(acc, cur)` and I honestly found it not very intuitive. 

<hr>

The main take-away is this: the whole idea of the reduce() function is to go from many values to a single value. The way to get there is to work with some sort of *last value* and *current value* that can be used to compute stuff with. It so happens that a majority of persons is calling the *last value* the `accumulator`, because it **persists** and is **updated** while iterating through all values. In contrast, the *current value*, often called `cur` is simply updated to the value at hand.


In our example above, `accumulator` is literally *accumulating* all values by adding them, one by one.
  
</Accordion>

<Accordion summary="Further resources on reduce()">

- [reduce() in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [a great intro video to reduce() by Leigh Halliday](https://www.youtube.com/watch?v=NiLUGy1Mh4U)
  
</Accordion>


### Sort the data
Another common thing you might want to do with your data is sorting it. Say you only want the

Palmer Penguins Data were collected and made available by [Dr. Kristen Gorman](https://www.uaf.edu/cfos/people/faculty/detail/kristen-gorman.php) and the [Palmer Station, Antarctica LTER](https://pallter.marine.rutgers.edu/), a member of the [Long Term Ecological Research Network](https://lternet.edu/).

### Array methods to cover

1. [slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
2. [sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 
3. [splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
4. [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
5. [reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

### Math nethods
1. [sign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign)
2. [round()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
3. [random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
4. [min()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min)
5. [floor()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
6. [abs()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs)

