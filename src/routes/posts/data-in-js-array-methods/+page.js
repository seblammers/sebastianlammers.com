export async function load({ fetch }) {
    const res = await fetch('/api/data.json?name=penguins')
    const data = await res.json()
  
    return {
        penguins: data
    }
  }
  