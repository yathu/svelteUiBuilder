<script lang="ts">
	import type { ChatItem, Conversation } from '../../constants/storeTypes.js';
	import { activeConversation, activeChatID, chats, messages } from '../stores.js';

	let messageInput = $state('');

	function sendMessage() {
		if (messageInput.trim()) {
			// messages.update((msgs) => [
			// 	...msgs,
			// 	{ id: Date.now(), type: 'user', content: messageInput.trim() }
			// ]);
			messageInput = '';

			// // Simulate assistant response
			// setTimeout(() => {
			// 	messages.update((msgs) => [
			// 		...msgs,
			// 		{
			// 			id: Date.now() + 1,
			// 			type: 'assistant',
			// 			content: 'I understand your request. Let me help you with that.'
			// 		}
			// 	]);
			// }, 1000);
		}
	}

	function handleKeydown(event: any) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}
</script>

<div class="flex h-full flex-col">
	<!-- Messages -->
	<div class="flex-1 space-y-2 overflow-y-auto p-4">
		{#each $activeConversation ?? [] as conversation}
			<div class="flex {conversation.role === 'user' ? 'justify-end' : 'justify-start'}">
				<!-- Updated user message color to use teal primary color -->
				<article
					class="prose prose-code:text-white prose-a:text-green-500 rounded-lg px-4 py-2 {conversation.role === 'user'
						? 'max-w-xs bg-neutral-800 !text-white lg:max-w-md'
						: ' !text-white'}"
				>
					{@html conversation.content.message}

					<!-- <article class="prose lg:prose-xl">
						{@html conversation.content.message}
					</article> -->
				</article>
			</div>
		{/each}
	</div>

	<!-- Input Area -->
	<div class="border-t border-gray-700 p-4 flex-1 max-h-22">
		<div class="flex gap-2">
			<input
				type="text"
				placeholder="Type your message..."
				bind:value={messageInput}
				onkeydown={handleKeydown}
				class="flex-1 rounded border border-gray-500 px-3 py-2 !outline-none"
			/>
			<button class="btn-primary" onclick={sendMessage}> Send </button>
		</div>
	</div>
</div>
