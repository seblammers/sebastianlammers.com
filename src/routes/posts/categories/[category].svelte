<script context="module">
    export const load = async ({ params, fetch }) => {
      const currentCategory = params.category
      const response = await fetch('/api/posts.json')
      const posts = await response.json()
  
      const matchingPosts = posts
        .filter(post => post.meta.categories.includes(currentCategory))
  
      return {
        props: {
          posts: matchingPosts,
          category: currentCategory
        }
      }
    }
    
  </script>

<script>
  import Card from '$lib/components/Card.svelte'
  export let posts
  export let category
</script>

{#if posts.length}
<article class="flow">
  
<h1>Content filed under "{category}"</h1>
  {#each posts as post}
    <Card {post} />
  {/each}
  
 </article>

{:else}
  <h1>Whoops!</h1> 
  <p>Sorry, couldn't find any content filed under "{category}".</p>

  <p><a href="/posts">Back to Posts</a></p>
{/if}