export async function load({ fetch }) {
    const res = await fetch('/api/sketches.json')
    let allSketches = await res.json()
  
    // only show posts that are finished
    allSketches = allSketches.filter(x => x.meta.draft === false);
  
    return {
      sketches: allSketches
    }
  }
  