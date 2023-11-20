  export const load = async ({ params, fetch }) => {
    const currentCategory = params.category
    const response = await fetch('/api/sketches.json')
    const sketches = await response.json()

    const matchingSketches = sketches
      .filter(sketch => sketch.meta.categories.includes(currentCategory))

    return {
      sketches: matchingSketches,
      category: currentCategory
    }
}