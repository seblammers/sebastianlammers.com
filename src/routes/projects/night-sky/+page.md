---
title: 'Stories from the night sky'
date: '2023-08-18'
href: 'https://storiesfromthenightsky.netlify.app/'
draft: false
image: 'detail-almach.png'
categories:
  - 'Data-driven'
  - 'History'
  - 'Design'
  - 'Map'
  - 'Canvas'
---

<script>
  import Button from '$lib/components/ButtonSimple.svelte';
  import Back from '$lib/components/ButtonBack.svelte';
  import Image from '$lib/components/Image.svelte';
  import src from '$lib/assets/images/projects/night-sky/title.png';
  import a from '$lib/assets/images/projects/night-sky/overview.png';
  import b from '$lib/assets/images/projects/night-sky/overview-hover.png';
  import c from '$lib/assets/images/projects/night-sky/detail-scheat.png';

  let alt = "Screenshot with a big text that reads 'Stories from the night sky' in bold white letters on a dark blue background. On top there is a star-shaped icon and below the large text, smaller text reads 'A data-driven visual experiment.' and on a new line 'By Sebastian Lammers'.";
  let alt_a = "Screenshot of a map of the night sky. On top there is text that reads 'Which star tells the most interesting story to you?'. The map shows around 5,000 stars, depicted as white circles on a dark blue background. Below the map there is a group of buttons that include arrow buttons for all directions, zoom-buttons, a reset button and a button with a star-symbol.";
  let alt_b = "Screenshot of a map of the night sky. On top there is text that reads 'Which star tells the most interesting story to you?'. The map shows around 5,000 stars, depicted as white circles on a dark blue background. A computer cursor shaped like a hand is hovering one of the stars. This star is enlarged and has a purple outline. Right below the cursor there is a white tooltip textbox that contains information about the hovered star. The information reads as follows. Star ID: 70692. Distance: 360 light years. Year: 1666 CE. Event(s): The Great Fire of London. Below the map there is a group of buttons that include arrow buttons for all directions, zoom-buttons, a reset button and a button with a star-symbol.";
  let alt_c = "Screenshot of a map of the night sky. On top there is text that reads 'Which star tells the most interesting story to you?'. The map shows around 50-60 stars, depicted as white circles on a dark blue background. A computer cursor shaped like a hand is hovering one of the stars. This star is enlarged and has a purple outline. Right below the cursor there is a white tooltip textbox that contains information about the hovered star. The information reads as follows. Star ID: 113881. Star Name: Scheat. Distance: 200 light years. Year: 1829 CE. Event(s): Sir Robert Peel founds the Metropolitan Police Service, the first modern police force. Below the map there is a group of buttons that include arrow buttons for all directions, zoom-buttons, a reset button and a button with a star-symbol.";
</script>

<Image {src} {alt} loading="eager"/>

## Description
[Stories from the night sky]({href}) is a data-driven visual experiment:
The light from the stars travels for years (and years) until it reaches your eyes. This **interactive map of the night sky** shows you for each star what happened on Earth when the light started traveling from the star to you. That way, any star has a story to tell you. You can zoom in, move around and hover all the stars to reveal the historical events they are connected to.

## Technologies used

- The site powered by [SvelteKit](https://kit.svelte.dev/)
- The map is built with [Svelte](https://svelte.dev/) & [d3](https://d3js.org/)
- Uses [Utopia](https://utopia.fyi/) for fluid responsive design
- Fonts fonts used throughout are [Andada Pro](https://andada.huertatipografica.com/) & [Roboto](https://en.wikipedia.org/wiki/Roboto)
- The code is [public here](https://github.com/seblammers/starmap)

## Images
<Image src={a} alt={alt_a} loading="lazy"/>
<Image src={b} alt={alt_a} loading="lazy"/>
<Image src={c} alt={alt_c} loading="lazy"/>

<Button {href}/>

<Back />