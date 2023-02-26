export async function load({ fetch }) {
  const res = await fetch('/api/posts.json')
  let allPosts = await res.json()

  // only show posts that are finished
  allPosts = allPosts.filter(x => x.meta.draft === false);

  return {
    posts: allPosts
  }
}
