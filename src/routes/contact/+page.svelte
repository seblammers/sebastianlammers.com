<script>
	import Heading from '$lib/components/Heading.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import InlineLink from '$lib/components/InlineLink.svelte';
	import { titleFormat } from '$lib/assets/js/utils';
	import { siteURL, siteAuthor } from '$lib/config';
	import { Head } from 'svead';
	import image from '$lib/assets/images/og-image.png';
	let heading = 'Contact';
	let title = titleFormat(heading);
	let description = 'Contact Sebastian Lammers';
	let url = 'https://sebastianlammers.com/contact';
	let authorName = siteAuthor;
	let website = siteURL;
</script>

<Head {title} {description} {image} {url} {authorName} {website} />

<Heading>{heading}</Heading>

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
