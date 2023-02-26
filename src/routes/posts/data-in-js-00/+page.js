export async function load({ fetch }) {
    const res = await fetch('/api/posts.json')
    const allPosts = await res.json()
  
    const series = allPosts
      // get all posts from this series
      .filter((el) => el.meta.title.includes("Data Wrangling in JS"))
      // exclude the intro (this post)
      .filter((el) => !el.meta.title.includes("Intro"));
    
    return {
      posts: series
    }
  }
  