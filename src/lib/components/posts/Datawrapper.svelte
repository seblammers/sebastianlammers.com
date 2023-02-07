<script>
	// This helper component will look for Datawrapper charts
	// on the page and handle their resizing
	// implemented this way to let you use the generic
	// EmbedIFrame.svelte also for Datawrapper charts
	import { browser } from '$app/environment';
	if (browser) {
		// via https://developer.datawrapper.de/docs/responsive-iframe
		window.addEventListener('message', function (e) {
			if (void 0 !== e.data['datawrapper-height']) {
				var t = document.querySelectorAll('iframe');
				for (var a in e.data['datawrapper-height'])
					for (var r = 0; r < t.length; r++) {
						if (t[r].contentWindow === e.source)
							t[r].style.height = e.data['datawrapper-height'][a] + 'px';
					}
			}
		});
	}
</script>
