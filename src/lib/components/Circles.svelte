<script>
import { tweened } from 'svelte/motion';

let width;    

// I'll define some specs for the circles to be used on desktop
// and below some specs for mobile to be tweened between
let specs = {
    cx: 50,
    cy: 50,
    r: 40,
    stroke: 3
};

let specsMobile = {
    cx: 30,
    cy: 30,
    r: 20,
    stroke: 1.5
};

// set up basic tweening
const tweenedSpecs = tweened(specs, {
		delay: 0,
		duration: 500
	});

// watch width and toggle boolean `mobile`
$: mobile = width < 900;

// if boolean `mobile` is true
// tween specs to mobile version
// else tween to basic specs
$: if (mobile) {
    tweenedSpecs.set(specsMobile)
} else {tweenedSpecs.set(specs)}

// create array of css variable names
// 10 blue shades
let blues = [
    "--palette-blue-10-base",
    "--palette-blue-20-base",
    "--palette-blue-30-base",
    "--palette-blue-40-base",
    "--palette-blue-50-base",
    "--palette-blue-60-base",
    "--palette-blue-70-base",
    "--palette-blue-80-base",
    "--palette-blue-90-base",
    "--palette-blue-100-base"
];

// 10 orange shades
let oranges = [
    "--palette-orange-10-base",
    "--palette-orange-20-base",
    "--palette-orange-30-base",
    "--palette-orange-40-base",
    "--palette-orange-50-base",
    "--palette-orange-60-base",
    "--palette-orange-70-base",
    "--palette-orange-80-base",
    "--palette-orange-90-base",
    "--palette-orange-100-base"
];
</script>

<svelte:window bind:innerWidth={width} />

<div class="circles flow">
    <p>Here are my shades of blue.</p>
    <br>

    <svg height="200" width="700">
        {#each blues as c, i}
            
                <circle 
                        cx="{$tweenedSpecs.cx + i *$tweenedSpecs.cx}"
                        cy="{$tweenedSpecs.cy}"  
                        r="{$tweenedSpecs.r}" 
                        stroke="white" 
                        stroke-width="{$tweenedSpecs.stroke}" 
                        fill="var({c})" />

        {/each}
    </svg> 

    
    
    <p>Here are my shades of orange.</p>
    <br>

    <svg height="200" width="700">
        {#each oranges as c, i}
            
            <circle 
                cx="{$tweenedSpecs.cx + i *$tweenedSpecs.cx}"
                cy="{$tweenedSpecs.cy}"  
                r="{$tweenedSpecs.r}" 
                stroke="white" 
                stroke-width="{$tweenedSpecs.stroke}" 
                fill="var({c})" />
               

        {/each}
    </svg>
</div>

<style>

    .circles {
        /* background-color: hsla(var(--palette-blue-80), 100%); */
        --flow-space: var(--space-2xs);
    }
    p {
		background-color: var(--theme-color) !important;
        
        color: hsla(var(--theme-color), 100%);
        color: var(--theme-color);
	}
</style>