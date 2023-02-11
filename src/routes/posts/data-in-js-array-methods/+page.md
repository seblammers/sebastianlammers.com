---
title: 'Data in Javascript: Array Methods'
date: '2023-02-11'
categories:
  - 'javascript'
  - 'data'
  - 'basics'
---

<script>
  import TOC from '$lib/components/posts/TOC.svelte';
  import Table from '$lib/components/posts/TableView.svelte';
  import Embed from '$lib/components/EmbedIFrame.svelte';

  // data is fetched from internal API in +page.js
  export let data;
  const penguins = data.penguins;
  
  let head = penguins.slice(0, 3); 

</script>

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

