<script lang="ts">
	import { newChat } from '$lib/API/requests.js';
	import { activeChatID, chats } from '../stores.js';

	let inputValue = $state('');

	async function handleSubmit() {
		if (inputValue.trim()) {
			try {
				const res = await newChat(inputValue);
				if (res?.id) {
					chats.update((items) => [...items, res]);
					activeChatID.set(res?.id);
				}
			} catch (error) {}
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSubmit();
		}
	}
</script>

<div class="flex flex-1 items-center justify-center p-8">
	<div class="w-full max-w-2xl text-center">

		<h1 class="mb-8 text-4xl font-bold text-white md:text-5xl">What can I help you build?</h1>

		<!-- input block -->
		<div class="relative mb-6">
			<textarea
				bind:value={inputValue}
				onkeydown={handleKeydown}
				placeholder="Ask me to build..."
				class="bg-surface w-full resize-none rounded-xl border border-gray-300 p-4 pr-12 text-lg text-white placeholder-gray-500 !outline-none focus:border-primary"
				rows="3"
			></textarea>

			<button
				onclick={handleSubmit}
				disabled={!inputValue.trim()}
				class="absolute right-3 bottom-3 rounded-lg bg-primary p-2 text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
				aria-label="Send message"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
					></path>
				</svg>
			</button>
		</div>
	</div>
</div>
