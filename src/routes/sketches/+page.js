export async function load({ fetch }) {
    const res = await fetch('/api/sketches.json')
    let allSketches = await res.json()
  
    // only show posts that are finished
    allSketches = allSketches.filter(x => x.meta.draft === false);

    // extract unique tags from all sketches
    let allTags = [...new Set(allSketches.flatMap(obj => obj.meta.categories))].sort();

    return {
      sketches: allSketches,
      tags: allTags
    }
  }
  