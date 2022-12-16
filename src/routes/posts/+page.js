export const prerender = true;

export async function load({ fetch }) {
  const res = await fetch('/api/posts.json')
  const allPosts = await res.json()

  return {
    posts: allPosts
  }
}
