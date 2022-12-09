<script context="module">
    export const load = async ({ fetch }) => {
      const posts = await fetch('/api/posts.json')
      const allPosts = await posts.json()
    
      return {
        props: {
          posts: allPosts
        }
      }
    }
</script>

<script>
    export let posts
    import Heading from "$lib/components/Heading.svelte";
    import Card from '$lib/components/Card.svelte';
  </script>
  
<Heading>
  Posts
</Heading>

<article class="flow">
  
  {#each posts as post}
    <Card {post} />
  {/each}
  
</article>
