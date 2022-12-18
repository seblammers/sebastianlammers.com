<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>

<h1>{$page.status}</h1>
<h2>{$page.error.message}</h2>

<p><strong>Sorry!</strong> Do you want to go to:</p>
<ul>
	<li><a href="/">Home</a></li>
	<li><a href="/posts">Posts</a></li>
</ul>
