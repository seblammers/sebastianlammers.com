export async function load({ fetch }) {
  console.log("running fetch now")
  const res = await fetch('/api/posts.json')
  const allPosts = await res.json()

  console.log("res is: ", res);
  console.log("------------------------");
  console.log("allPosts is: ", allPosts);
  return {
    posts: allPosts
  }
}
