<script>
	import { Head } from 'svead';
	import image from '$lib/assets/images/og-image.png';

	let title = 'Sebastian Lammers';
	let description = 'Data Visualization & Information Design';
	let url = 'https://sebastianlammers.com';
	let authorName = 'Sebastian Lammers';
	let website = url;
</script>

<Head
	seo_config={{
		title,
		description,
		url,
		open_graph_image: image,
		author_name: authorName,
		website
	}}
/>
