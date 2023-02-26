export async function load({ fetch }) {
    const resData = await fetch('/api/data.json?name=penguins')
    const data = await resData.json()

    const resPosts = await fetch('/api/posts.json')
    const allPosts = await resPosts.json()
  
    const series = allPosts
      // get all posts from this series
      .filter((el) => el.meta.title.includes("Data Wrangling in JS"))
      // exclude the intro
      .filter((el) => !el.meta.title.includes("Intro"));
  
    return {
        penguins: data,
        posts: series
    }
  }
  