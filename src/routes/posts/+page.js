export async function load({ fetch }) {
  const res = await fetch('/api/posts.json')
  let allPosts = await res.json()
  
  return {
    posts: allPosts
  }
}
