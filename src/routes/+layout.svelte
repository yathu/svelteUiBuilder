<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import { dev } from '$app/environment';

	import favicon from '$lib/assets/favicon.svg';

	if (dev && browser) {
		import("../mock/browser").then(({ worker }) => {
			worker.start({ onUnhandledRequest: 'bypass' });
		});
	}

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
