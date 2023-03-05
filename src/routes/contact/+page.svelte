<script>
	import Heading from '$lib/components/Heading.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import InlineLink from '$lib/components/InlineLink.svelte';
	import { siteURL, siteAuthor } from '$lib/config';
	import { Head } from 'svead';
	let title = 'Contact';
	let description =
		'The contact page of sebastianlammers.com, my personal homepage, where I play with code and share some notes and projects.';
	let url = 'https://sebastianlammers.com/contact';
	let authorName = siteAuthor;
	let website = siteURL;
	let image = `https://ik.imagekit.io/seblammers/tr:otf-Inter-SemiBold_zoEu2Lj-l.otf,ot-${title},ots-72,otc-FFF,ox-10,oy-20,otw-700/twittercard_-1cx8-LQN.png`;
</script>

<Head {title} {description} {image} {url} {authorName} {website} />

<Heading>{title}</Heading>

<article class="post flow">
	<p>
		I'd love to hear from you! Let me know what you think about what you found on my website. Or hit
		me with whatever questions you might have.
	</p>
	<p>
		If you want to talk, find me <InlineLink url="https://vis.social/@seblammers"
			>on Mastodon</InlineLink
		> or use the form below.
	</p>

	<Contact />
</article>
