---
title: 'Data Wrangling in JS: 03 Advanced'
date: '2023-02-11'
draft: false
categories:
  - 'JavaScript'
  - 'data'
  - 'basics'
---

<script>
  import TOC from '$lib/components/posts/TOC.svelte';
  import Table from '$lib/components/posts/TableView.svelte';
  import { maxByKey } from '$lib/assets/js/utils';
  import Bar from '$lib/components/posts/Bar.svelte';
  import Embed from '$lib/components/EmbedIFrame.svelte';
  import Link from '$lib/components/InlineLink.svelte';


  // data is fetched from internal API in +page.js
  export let data;
  const penguins = data.penguins;
  
  let smolData = penguins.map(row => {
    return {
      species: row.species,
      body_mass_g: +row.body_mass_g
    }
  });

  let maxValues = maxByKey(smolData, "species", "body_mass_g")
    .sort((a, b) => a.body_mass_g - b.body_mass_g); 

</script>

<TOC>

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
- [Closing](#closing)

</TOC>


<Accordion summary="Load the data">

Like in the previous post, we'll use only vanilla JavaScript, so you will be able to follow along in the console of your browser.

To load the data into your console, do the following:

```js
// this is the url that you need to fetch the data
let url = "https://www.sebastianlammers.com/api/data.json?name=penguins" 

// this will load the data into your session under the name "data"
let data = await (await fetch(url)).json();
```

If you prefer a REPL, use <Link url="https://svelte.dev/repl/1178b686372a457f9994fedff3923ce7?version=3.53.1">the starter</Link> with pre-loaded data (or continue where you left off?).

</Accordion>

## Count frequency of distinct values

In the [previous post](/posts/data-in-js-02), we found out there are only 3 species in our dataset. An obvious next question is: how many of the 344 observations does each of the 3 species account for?

Let's first find out for just one species to understand what kind of operation is needed for this task and afterwards look at all species.

Out of the 3 species at hand, *Gentoo* sounds like the most fun to me, so we'll count these first.
Basically, we want to take the **array** and summarize the number of appearances of *Gentoo*. Another way of saying the same is: we want to *reduce* the **array** (many observations) to a single value (number of *Gentoo* penguins).

Drumroll...

<Blockquote 
text = "The <code>reduce()</code> method executes a user-supplied 'reducer' callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value."
author="MDN Web Docs"
url="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce"/>

To introduce `reduce()`, I'll reach to a standard example: computing the sum of *something*.
Let's make it really simple.

### Reduce to sum

```js
// example array
let bodyMassGrams = [3750, 3800, 3250];

// declare initial value
let initialValue = 0;

let bodyMassSum = bodyMassGrams.reduce(
  (accumulator, currentValue) => accumulator + currentValue, initialValue
  );

console.log(bodyMassSum) // logs 10800
```

This code takes the **array** of 3 numbers and adds them up together.
It goes through the **array**, takes the *last value* (`accumulator`) and adds the *current value* to it.
Because we specify an *initial value*, this will be the first value that `accumulator` takes (i.e. `initialValue = 0`).
*Current value* will be 3750, because it is the first entry in our **array**, and the sum of both is also 3750 (`0 + 3750`).
Moving on to the next step, *now* `accumulator` is 3750 and *current value* is 3800 and so on and so on.

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


Back to our data (an **array of objects**, remember?). Let's count all those *Gentoo* penguins with the help of reduce:

### Count Gentoo


```js
let initialValue = 0;

let countGentoo = data.reduce((counter, row) => {
  if (row.species === "Gentoo") counter += 1
  return counter;
  }, initialValue);

console.log(countGentoo); // logs 124
```

Voilá! We have 124 *Gentoo* penguins in our dataset.

I deviated from the traditional variable names here, because basically what we do is **counting**. And since we're iterating through the rows of our table (aka the **objects** inside our **array**), I use *row* to refer to the current **object**. 
For each row, inside the `species` variable, check if that is equal to `"Gentoo"`. 
**If so**, increase our counter accumulator by 1. 
Return the counter when the whole **array** is processed.

<Accordion summary='Find another way'>

If you still remember what you learned about `filter()`, then you will be able to use that too to find out how many Gentoo are in the data.

I'll leave that as an exercise to you.

</Accordion>


But! If we want to do the same for the other two species, we'd have to repeat that code...
Instead, let's quickly turn our snippet from above into a function that we can re-use.

### A counting function

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

The variable-name `accumulator` or the shorter version `acc` is a very common choice for JavaScript's reduce(). When I first encountered reduce(), I saw lots of examples that always used `(acc, cur)` and I honestly found it not very intuitive. 

<hr>

The main take-away is this: the whole idea of the reduce() function is to go from many values to a single value. The way to get there is to work with some sort of *last value* and *current value* that can be used to compute stuff with. It so happens that a majority of persons is calling the *last value* the `accumulator`, because it **persists** and is **updated** while iterating through all values. In contrast, the *current value*, often called `cur`, is simply updated to the value at hand.


In our example above, `accumulator` is literally *accumulating* all values by adding them, one by one.
  
</Accordion>

<Accordion summary="Further resources on reduce()">

- [reduce() in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [a great intro video to reduce() by Leigh Halliday](https://www.youtube.com/watch?v=NiLUGy1Mh4U)
  
</Accordion>


## Sort the data
Another common thing you might want to do with your data is sorting it. 
Say you want to make sure the penguins with the lowest body mass are listed first in your data.
How would you go about that?
While there is a native **array** method called `sort()`, I'm showing this rather late in this post, because I find it to be surprisingly complex.
Here is the code you'd probably write first:

```js
// get ready for a surprise: 
let sorted = data.sort((a, b) => a.body_mass_g - b.body_mass_g);
```

If you inspect the `sorted` data, you'll find it is indeed sorted as expected.
Job done.

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

... you don't need to assign to a new variable and instead can just call `sort()` on your data like so:

```js
data.sort((a, b) => a.body_mass_g - b.body_mass_g);
```
</Accordion>

Here is the code you need to create *a new* **array** with the sorted values.

```js
// this creates a new sorted copy
let sorted = [...data].sort((a, b) => a.body_mass_g - b.body_mass_g);
```

We use a neat little trick to **first copy** the **array** via the spread syntax `[...data]` and **then sort** *that new copy* in place and assign it to our variable `sorted`. 

<Accordion summary="Alternative to the Spread syntax '...'">

Another way to create a copy and then sort the copied array is to use `slice()` without arguments:

```js
// this creates a new sorted copy
let sorted = [...data].sort((a, b) => a.body_mass_g - b.body_mass_g);

// same:
let slicedSorted = data.slice().sort((a, b) => a.body_mass_g - b.body_mass_g);

console.log(sorted === slicedSorted) // logs "true"
```
  
Pick your poison.
In my humble opinion both are ok, but I would find it more intuitive if `sort()` simply returned a new array (like `map()` and `filter()` do.)

</Accordion>

### Ascending vs. descending order
The obvious question right now is: why do we need to write this `a - b` stuff?
`Sort()` expects a *compare function* that specifies *what* should be sorted and *how* it should be sorted.
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
Let's take this **array** of 3 values and think through what is compared and how that will affect the sorting.
In the table below I list the comparison, the numerical result, and the effect on sorting the elements, step by step.

<div class="table-wrapper" >

| comparison |    result | effect |
|------------|-----------|--------|
| (a: 3750) - (b: 3800) =| -50 | 3750 is sorted *before* 3800 |
| (a: 3800) - (b: 3250) =| 550 | 3800 is sorted *after* 3250 |
| (a: 3750) - (b: 3250) =| 500 | 3750 is sorted *after* 3250 |

</div>

Now all values have been compared to each other and the order has been established!
The first comparison yields a *negative number*, so `a: 3750` is sorted *before* `b: 3800`.
The other two comparisons both yield a *positive number*, because `3800` and `3750` are both greater than `3250`...

In case this still does not make sense to you right now I encourage you to watch the video by The Coding Train that I link to below.
Daniel makes an incredible job at explaining and showcasing `sort()`.

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



## Mutate, select, rename columns
We're gonna finish this post off with a roundhouse-kick of data manipulations. 
Adding a new column based on existing ones? Got ya!
Renaming existing columns? Easy!
Selecting columns to boil down the amount of data? Totally!

And ***all these*** can be done with the help of our trusty `map()` function!

### 1: Mutate to add a new column

Let's jump right in and re-use the `map()`-example from above, but this time applying the conversion of grams to kilograms to all 344 observations.

```js
// convert from grams to kilograms for all entries
let dataWithKG = data.map(row => {
    return {
      body_mass_kg: row.body_mass_g / 1000
    }
  });
```

As with the other use of `map()` above, this let's us visit each entry in our **array** called `data`.
Inside each of those entries (*or rows of our table*), we define a new pair of `key:` and `value`.
Sticking to the variable-naming convention of this dataset, we call our new colum `body_mass_kg` and define the values with the simple computation for each of the `row.body_mass_g`.
Notice that we `return` an **object** by wrapping our simple computation in curly bois `{}`.
If you `console.log()` the result of this operation, you'll see that we successfully converted all entries in our rows from grams to kilograms.
But you'll also notice that all the other columns are gone.
That's a shame isn't it? 
Luckily, it's easy to preserve them all with another friend: the **spread syntax**.

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

If you want to clean up my mess, you can use this little trick to convert any of the columns to numerical values too.
You'll have to specify which columns you want to convert inside `map()` like this:

```js
let dataWithNumerics = data.map(row => {
    return {
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

### 2: Select columns

Going from many columns to a selection of a few needed columns is a piece of cake now.
Let's say we want to visualize `body_mass_g` by `species`. 
Let's make a new, smaller **array of objects** that only contains those two columns. 

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

A proper visualization should maybe also show the variation within in the species, instead of reducing everything to the heaviest observation... 
Let me know if you create a better graph...!


### 3: Rename columns

I think you can guess by now how to rename a column. 
Nobody is stopping you from just using a different `key:` inside your `map()` call.
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
Technically, you could also go crazy and use something like `"I need some space":` as your `key:`, but you'll have other problems down the road then, like not being able to use the **dot-notation** to access your rows (`row.I need some space` will not work).

## Closing
You made it. 
Thanks for reading!
I hope you learned something new and maybe even had some fun.

Let me know :)
If you want to talk, find me [on Mastodon](https://vis.social/@seblammers) or use [my form over here](/contact).
