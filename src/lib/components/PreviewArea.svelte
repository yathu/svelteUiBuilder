<script lang="ts">
	import { generatedCode } from '../stores.js';
	import { HighlightAuto } from 'svelte-highlight';
	import horizonDark from 'svelte-highlight/styles/horizon-dark';

	function createPreviewHtml(code: string) {
		const doctype = '<!DOCTYPE html>';
		const htmlOpen = '<html>';
		const headOpen = '<head>';
		const metaCharset = '<meta charset="utf-8">';
		const metaViewport = '<meta name="viewport" content="width=device-width, initial-scale=1">';
		const tailwindScript = '<script src="https://cdn.tailwindcss.com"><\/script>';
		const headClose = '</head>';
		const bodyOpen = '<body class="p-4 bg-white">';
		const bodyClose = '</body>';
		const htmlClose = '</html>';

		return (
			doctype +
			htmlOpen +
			headOpen +
			metaCharset +
			metaViewport +
			tailwindScript +
			headClose +
			bodyOpen +
			code +
			bodyClose +
			htmlClose
		);
	}

	const previewContent = $derived.by(() => createPreviewHtml($generatedCode));

	const code = `<div class="mx-auto max-w-sm rounded-xl bg-gray-50 p-6 text-center shadow-md">
									<h2 class="mb-2 text-xl font-bold">Card Title</h2>
									<p class="text-gray-600">This is a simple card made with Tailwind CSS. It's clean, minimal, and fully responsive.</p>
								</div>`;
</script>

<svelte:head>
	{@html horizonDark}
</svelte:head>

<div class="flex h-full flex-col overflow-hidden">
	<!-- Code Panel -->
	<div class="border-b border-gray-500 p-2 w-full overflow-auto overflow-x-scroll font-mono text-sm text-white">
		<HighlightAuto class="h-full" code={$generatedCode} />
	</div>

	<!-- Preview Panel -->
	<div class="flex-1">
		<div class="flex h-full flex-col">
			<div class="flex-1">
				<iframe srcdoc={previewContent} class="h-full w-full border-0" title="Live Preview"
				></iframe>
			</div>
		</div>
	</div>
</div>
