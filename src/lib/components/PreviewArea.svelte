<script lang="ts">
	import { activeMaxVersion, activeVersion, generatedCode } from '../stores.js';
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
</script>

<svelte:head>
	{@html horizonDark}
</svelte:head>

<div class="flex h-full flex-col overflow-hidden">
	<!-- Code Panel -->
	<div
		class="w-full flex-1 overflow-auto overflow-x-scroll border-b border-gray-500 p-2 font-mono text-sm text-white"
	>
		<HighlightAuto class="h-full" code={$generatedCode} />
	</div>

	<div class="flex items-center justify-start gap-4 py-2 ps-2.5">
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button
			class="cursor-pointer rounded bg-neutral-800 px-2 py-1 text-white disabled:opacity-30"
			disabled={$activeVersion <= 0}
			onclick={() => activeVersion.set($activeVersion - 1)}
		>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg
			>
		</button>
		<span class="font-semibold">Version: {$activeVersion + 1} of {$activeMaxVersion + 1}</span>
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button
			class="cursor-pointer rounded bg-neutral-800 px-2 py-1 text-white disabled:opacity-30"
			disabled={$activeVersion == $activeMaxVersion}
			onclick={() => activeVersion.set($activeVersion + 1)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-chevron-right-icon lucide-chevron-right"
				><path d="m9 18 6-6-6-6" /></svg
			>
		</button>
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
