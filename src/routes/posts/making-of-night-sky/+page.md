---
title: 'Making of Stories from the night sky'
date: '2023-10-10'
draft: false
href: 'https://storiesfromthenightsky.netlify.app/'
image: '/detail-almach.png'
categories:
  - 'projects'
  - 'map'
  - 'interactive'
  - 'historic data'
---

<script>
  import TOC from '$lib/components/posts/TOC.svelte';
  import DotPlot from '$lib/components/posts/DotPlot.svelte';
  import Button from '$lib/components/ButtonSimple.svelte';
  import UnitSpan from '$lib/components/UnitSpan.svelte';
  import Image from '$lib/components/Image.svelte';
  import Toggle from '$lib/components/Switch.svelte';
  import src from '$lib/assets/images/projects/night-sky/detail-almach.png';
  import Embed from '$lib/components/EmbedIFrame.svelte';
  import Colours from '$lib/components/posts/ColoursNightSky.svelte';
  import firstMap from '$lib/assets/images/projects/night-sky/process/01-first-map.png';
  import thirdMap from '$lib/assets/images/projects/night-sky/process/03-no-voronoi.gif';
  import voronoiGif from '$lib/assets/images/projects/night-sky/process/04-voronoi.gif';
  import histogram from '$lib/assets/images/projects/night-sky/process/stars-histogram.png';
  import accent from '$lib/assets/images/projects/night-sky/process/accent.png';
  import hero from '$lib/assets/images/projects/night-sky/title.png';
  import gridDesktop from '$lib/assets/images/projects/night-sky/process/grid-desktop.png';
  import gridMobile from '$lib/assets/images/projects/night-sky/process/grid-mobile_wide.png';

  const distanceSun = 149600000;
  const distanceWorld = 28081;

  // keep track of which unit is used
  let isKm = true;

  function handleClick() {
    isKm = !isKm;
  }

  //   export let data;
  let alt = 'Screenshot of a map of the night sky. On top there is text that reads "Which star tells the most interesting story to you?". The map shows around 50-60 stars, depicted as white circles on a dark blue background. A computer cursor shaped like a hand is hovering one of the stars. This star is enlarged and has a purple outline. Right below the cursor there is a white tooltip textbox that contains information about the hovered star. The information reads as follows. Star ID: 9640. Star Name: Almach. Distance: 390 light years. Year: 1631 CE. Event(s): Mount Vesuvius erupts. Below the map there is a group of buttons that include arrow buttons for all directions, zoom-buttons, a reset button and a button with a star-symbol.';
  let altFirstMap = 'Screenshot of the first SVG map I made from the d3-celestial data with the geoEqualEarth-projection.';
  let altThirdMap = 'Gif of the third SVG map I made from the d3-celestial data with the geoEquirectangular-projection. It now also shows a mouse cursor shaped like a pointing hand and a tooltip text displaying an ID per star on hover.';
  let altVoronoi = 'Gif of the fourth SVG map I made from the d3-celestial data with the geoEquirectangular-projection. It now also shows dense network of cells that surround each star. This network of voronoi-cells enhances the tooltip handling such that there is always the closest star selected and its ID shown.';
  let altHistogram = 'A histogram showing the amount of stars (vertical axis) across their distances in light years (horizontal axis). The vertical axis has peak values of around 230 stars counted, which are reached in relatively low values of the horizontal axis (around 200-400). The horizontal axis has max. values of around 3200 light years. Broadly the distribution of the data is centered to the left with a long tail to the right. Part of the data are highlighted via a blue-outlined rectangle: this part corresponds to light years within 172 years, which is the upper limit of the archive of the New York Times Archive API. The records of the API go back to 1851, which corresponds to difference of 172 years from today. The title of the chart reads "NYT Range covers only a fraction of the distances". ';

  let options = ["km", "mi"];
</script>

<Image {src} {alt} loading="eager"/>

## Project summary
The light from the stars travels for years (and years) until it reaches your eyes.
[This interactive map of the night sky](https://storiesfromthenightsky.netlify.app/) shows you for each star what happened on Earth when the light started traveling from the star to you. 
That way, any star has a  story to tell you. You can zoom in, move around and hover all the stars to reveal the historical events they are connected to. 

If you haven't seen the project yet, feel free to go there now. I'll wait here.

<Button {href}/>

<br/><br/>

Below I'll go through some of the steps I took to build the project, some design considerations, as well as some pieces that did not make it into the final project.

<TOC>

- [Project summary](#project-summary)
- [Inspiration](#inspiration)
- [Data](#data)
  - [Finding star coordinates](#finding-star-coordinates)
  - [Finding star distances](#finding-star-distances)
  - [Finding historic events](#finding-historic-events)
  - [Merging star data and historic data](#merging-star-data-and-historic-data)
- [Design](#design)
  - [Colours](#colours)
  - [Units](#units)
  - [Control buttons](#control-buttons)
  - [Fonts](#fonts)
- [Outtakes](#outtakes)
- [Wrapping up](#wrapping-up)

</TOC>

## Inspiration
This whole project was inspired by a scene in the excellent movie [Nomadland](https://www.searchlightpictures.com/nomadland/), written, directed, produced and edited by [Chloé Zhao](https://en.wikipedia.org/wiki/Chlo%C3%A9_Zhao). In that scene someone says (pointing at the night sky):

<Blockquote 
text = "That's the star Vega, but it's 24 light years away. So what that means is the light that you're looking at left Vega in 1987. — And it just got here."
author="Nomadland (Movie, 2020)"
url="https://www.searchlightpictures.com/nomadland/"/>

I had not thought about light years in that way before. 
Sure, I was aware that the stars are very far away. 
But connecting the distance of a star to a date in the past: that was an idea that struck a chord with me. 
My next thought was to build an interactive map of the night sky that would *somehow* connect light years to historical events.

## Data
I knew I wanted to built the project with Svelte and had hopes that someone had done a map of the night sky before (maybe even in d3?). But before starting to develop any code, I researched a bit about stars in general. How far away they are. How distances are typically measured ([Parsecs!?](https://en.wikipedia.org/wiki/Parsec)).
One thing was clear: I had to *make a selection of stars*, because there are simply too many of them.

### Finding star coordinates
After some *Wikipedia rabbit holes*, I quickly found [d3-celestial](https://github.com/ofrohn/d3-celestial), which seemed to be the perfect starting point at first glance, since it advertises itself as an "[*Interactive, adaptable celestial map done with the D3.js visualization library*](https://github.com/ofrohn/d3-celestial#readme)".

However, I quickly realized that it would not be trivial to integrate the d3-celestial script into a Svelte project and still gain full control over presentational attributes and interaction parameters.

But crucially, d3-celestial provided me with the starting point: "*GeoJSON for sky stuff*". Which is to say: coordinates that can be used to build a map of stars with Svelte & d3.

This is what my initial draft looked like. A static map of the night sky:
<Image src={firstMap} alt={altFirstMap}/>

After playing a bit with different projections, I landed on the equirectangular projection, because it looks more like what you'd expect to see (based on typical photographs or simply looking at the actual night sky). It was an interesting revelation that the same kind of algorithms that are used to compute 2D representations of the 3D sphere we call Earth can also be used to compute 2D representations of *all the stars* around us.

This is what my next iteration looked like. A static map of the night sky, with a tooltip that is shown when you *hover exactly over* a star:
<Image src={thirdMap} alt={altThirdMap}/>

But, as you can probably imagine, it's a frustrating experience to try to aim the mouse cursor *exactly* at one of those tiny white circles.
If you can't imagine that, you can go have that experience right now, in the [REPL over here](https://svelte.dev/repl/503bb7b8aaa840808993e1859455fc1b?version=4.2.0).

The solution to this problem is called [Voronoi](https://en.wikipedia.org/wiki/Voronoi_diagram):
<Image src={voronoiGif} alt={altVoronoi}/>

Given a number of points, a Voronoi-algorithm will compute a mesh of cells. 
Each of these cells contains exactly one of the initial points and will span as much room as possible.
So what you end up with is a magic spider web that will tell you for any space *between two points* which of the original points is closest. 
Tada!

### Finding star distances
With that in place, I turned around to the data again and started to look for another database that would provide me with the distance in light years.
Because d3-celestial nicely provided the *coordinates* for the stars, along with an ID, but *no distance measure* was included.
I found the [HYG Database](https://github.com/astronexus/HYG-Database), which contained the distance, as well as the same type of ID.
Now I could write some code to match each star via their ID and combine coordinates and distances (converting from Parsecs to light years along the way).

### Finding historic events
Next to considering the [Wikipedia Timelines](https://en.wikipedia.org/wiki/Timelines_of_world_history), I also played around with the [Archive API of the New York Times](https://developer.nytimes.com/docs/archive-product/1/overview), which goes back all the way to 1851! 
But while that is impressive, it's just a tiny fraction of what was needed to match the star distances in light years.

<Image src={histogram} alt={altHistogram}/>

As you can see in the chart above, the stars in my data were spanning a much larger range of distances in light years than the NYT API could cover.
With this range in mind, I turned to Wikipedia again and started collecting the different timelines into one coherent stream of events (in a giant table).
This was surprisingly messy and the different timelines were not consistent in their structure so that on top of scraping the data, I needed to do quite some manual cleaning to ensure that only dates and events remained in my table. 
In the end, I had a table with 2070 entries that included historical events from 3200 BCE until 2022-12-31.


<Accordion summary="Want that data?">

If you want to play with that data or even use to build your own project, be my guest:

Here is a [CSV-file](https://raw.githubusercontent.com/seblammers/sebastianlammers.com/master/src/routes/api/data.json/wikiEvents.csv) and a [JSON-file](https://raw.githubusercontent.com/seblammers/sebastianlammers.com/master/src/routes/api/data.json/wikiEvents.json) for your convenience.

Let me know if you use this, I'd love to see what you make with it!

</Accordion>

### Merging star data and historic data
The final step in the data preparation process was to find matches between each star's distance in light years and the appropriate historic event(s). 
There were a few obstacles that made this challenging:

1. Handling dates is hard, no matter what your tool is (I looked at JavaScript and `lubridate` in R and used the latter in the end)
2. Handling dates that deviate from common patterns is even harder (e.g. if your parser expects `YYYY-MM-DD` but gets 871-01-01)
3. Handling dates in BCE is the worst. At least from what I saw, it got handled *so badly*. I guess it's because most of the  code that gets written to match dates is referring to current events, not events from the ancient past...?

Especially when trying to write code that would handle both BCE and CE dates gracefully, I had to account for many special cases.
In the end, I went for the pragmatic solution: I split the data between BCE and CE and handled them separately.

For each star, I calculated which date corresponds to `now - lightYears`. 
That gave me a unique date for each star, but not yet a match with any events in the historic table. 
To find that match for each star, I needed to programmatically find the closest match between star-date and historic-date. 

<Accordion summary="The matching function">

If you ever find yourself wanting to match some dates, here is my solution to that problem:

```r
# make sure you have lubridate installed and loaded
library(lubridate)

# a helper-function to find the closest match for a given date
find_closest_match <- function(date, reference_dates) {
  
  # this relies on lubridate-magic to find the closest date
  # within all of the reference_dates.
  closest_index <- which.min(abs(date - reference_dates))
  
  # return the date as a string of characters, 
  # (it gets screwed up otherwise)
  # don't ask me about it.
  closest_match <- as.character(reference_dates[closest_index])
  
  return(closest_match)
}

# how to use it:
# example dates (make sure they are really dates and not just strings)
test_date = ymd("1922-01-31")
historic_dates = ymd(c("1922-01-15", "1922-02-02", "1922-02-28"))

# which of the three is closest to the test_date?
find_closest_match(test_date, reference_dates = historic_dates)

```

</Accordion>

After solving that little puzzle, I had what I needed: for each star, the closest corresponding item in the table with the historic events. 
With that, I was able to merge all that data together (or join the two tables, as they say) and produce one giant geoJSON-object that contained 1) star-coordinates, as well as 2) the distance in light years **AND** 3) the closest matching historic event(s). *Yay!*

## Design
### Colours

I based all colours off a very very dark blue that I picked to look like what I imagine the void between the stars looks like.
Based on that blue hue, I created the purple, that I used throughout the site as an accent colour (e.g. for the scroll-bar, to add emphasis to the currently selected star and for the hover-styles of the buttons). 
The two bright colours are based on the same blue hue as well to make them all work together nicely.
These are the 4 main colours:

<Colours />

The colours in action:
<Image src={accent} alt="A screenshot that shows how the accent colour is used, e.g. for the scroll bar, the selected star, and the hover-styles of the buttons."/>

### Units
I implemented a little unit switching component to toggle between kilometers and miles.
This was fueled by some project that I had seen that used °F, which is hard for me to interpret, since my brain works with °C by default.
So I wanted to give users the freedom to choose which measure of distance they prefer for my project.

My aim was to enable users to toggle between the two units and apply that change across the whole site.
Here is an example of two values. 
If you toggle one of them, the other changes too.

*Distance to go once around Earth (tap to toggle units)*:

<div style="font-size: var(--step-4); font-family: var(--codeFont); margin: 0;">
<UnitSpan
    value={distanceWorld}
    {handleClick}
    {isKm}
    formatString=",.3r" />
</div>


*Distance from Sun to Earth (tap to toggle units)*:

<div style="font-size: var(--step-4); font-family: var(--codeFont); margin: 0;">
<UnitSpan
    value={distanceSun}
    {handleClick}
    {isKm}
    formatString=",.3r" />
</div>

Adding a toggle button or another way to centrally control this feature would have been possible too, but I opted for the more subtle inline-text version.

<button style="min-width: 30ch;" on:click={handleClick}>Toggle Units to {isKm ? "Miles" : "Kilometers"}</button>

<Accordion summary="Want to play with that component?">

Here you go:
<Embed 
  src="https://svelte.dev/repl/d3ea8eaecbc34f73af8e29e341b8bb30?version=4.2.1" 
  title="A Svelte REPL titled 'Unit Toggling Span Component'"
/>

</Accordion>



### Control buttons
I decided to make a control panel to make the actions users can take on the map very explicit.
<Image src={gridDesktop} alt="Another screenshot of the project. This time the control panel is highlighted in yellow."/>

The biggest challenge here was to find a design that works on wide *and* narrow screens.
In addition to my beloved [utopian fluid spacing values](https://utopia.fyi/space/calculator?c=320,18,1.2,1240,20,1.25,5,2,&s=0.75%7C0.5%7C0.25,1.5%7C2%7C3%7C4%7C6,s-l&g=s,l,xl,12), I found that I needed two slightly adapted versions.
One for wide screens with more breathing room between the buttons, that is right-aligned (see picture above).
And another for smaller screens that is more compact and aligned in the center of the screen:
<Image src={gridMobile} alt="Another screenshot of the project in mobile view. The control panel is highlighted in yellow."/>


### Fonts

I picked [Andada Pro](https://andada.huertatipografica.com/) as the main font, because it it has the flair of a timeless classic with a modern touch.
The serif style is balanced with some very neat slab-style details, like the straight descender of the *y*.
As a nice bonus I also found out that [Andada Pro](https://andada.huertatipografica.com/) has some decorative elements, like the star-glyph I used on the very top and the very bottom of the page (and the favicon):

<Image src={hero} alt="Screenshot of the hero-section of the project that has the title 'Stories from the night sky' in big white letters on very dark blue background."/>

Inside the tooltip, that is shown when a star is hovered or selected, I chose something with a more technical feeling and found that [Roboto](https://en.wikipedia.org/wiki/Roboto) was a nice sans-serif match to [Andada Pro](https://andada.huertatipografica.com/).

## Outtakes

In my early drafts, I had a longer introduction, that contained not only more text, but also an additional type of interactive element: a little animation to showcase how fast light is traveling.
I decided to cut those out for the final piece to guide the reader faster to the centerpiece: the map of the night sky.
But I'm still fond of the little interactive dot plot animation I developed, and therefore, I'll share it with you right here, right now.
Here is how long the light needs to travel from *Sirius* to Earth *if 1 light year would take 1 second*:

<DotPlot />

Crazy, right? In reality, the light travels 8.6 ***years*** until it reaches you.
And that's a tiny distance, when you compare it to the vast majority of stars out there...

## Wrapping up
I learned a lot while building this project and loved tinkering with the little details.
There will probably be a future iteration that will have a full-screen mode, and I'm considering adding filtering controls to show stars that match date criteria (like show only stars that between 30 and 35 light years away).

Thank you for reading!
If you have any comments or questions, please [let me know](https://sebastianlammers.com/contact)!