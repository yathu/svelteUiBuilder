<script lang="ts">
	import { onMount } from 'svelte';
	import {
		activeChatID,
		activeConversation,
		activeConversations,
		activeMaxVersion,
		activeVersion,
		chats
	} from '../stores.js';
	import { singleConversation } from '../../mock/data.js';
	import type { Conversations } from '../../constants/storeTypes.js';

	let messageInput = $state('');
	let isLoading = $state(false);

	function sendMessage() {
		if (messageInput.trim()) {
			isLoading = true;
			fetch('https://jsonplaceholder.typicode.com/newChat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ message: messageInput })
			})
				.then((response) => response.json())
				.then((data: Conversations) => {
					console.log('Server response:', data);

					if (data) {
						const newActiveChat = [...($activeConversations ?? []), singleConversation];
						console.log('newActiveChat==>', newActiveChat);

						chats.update((chat) =>
							chat.map((item) =>
								item.id == $activeChatID
									? { ...item, conversations: [...(item.conversations ?? []), singleConversation] }
									: item
							)
						);

						//this is for set latest chat in UI
						newActiveChat && activeVersion.set(newActiveChat?.length - 1);
					}
				})
				.catch((error) => {
					console.error('Error sending message:', error);
				})
				.finally(() => {
					isLoading = false;
				});

			messageInput = '';
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
		{#if isLoading}
			<!-- Skeleton loader -->
			<div class="animate-pulse flex flex-col gap-2">
				<div class="self-end w-2/3 max-w-xs lg:max-w-md h-6 bg-neutral-700 rounded-lg"></div>
				<div class="self-start w-1/2 max-w-xs lg:max-w-md h-6 bg-neutral-800 rounded-lg"></div>
				<div class="self-end w-1/3 max-w-xs lg:max-w-md h-6 bg-neutral-700 rounded-lg"></div>
			</div>
		{:else}
			{console.log($activeConversation)}
			{#each $activeConversation ?? [] as conversation}
				<div class="flex {conversation.role === 'user' ? 'justify-end' : 'justify-start'}">
					<!-- Updated user message color to use teal primary color -->
					<article
						class="prose rounded-lg px-4 py-2 prose-a:text-green-500 prose-code:text-white {conversation.role ===
						'user'
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
		{/if}
	</div>

	<!-- Input Area -->
	<div class="max-h-22 flex-1 border-t border-gray-700 p-4">
		<div class="flex gap-2">
			<input
				type="text"
				placeholder="Type your message..."
				bind:value={messageInput}
				onkeydown={handleKeydown}
				class="flex-1 rounded border border-gray-500 px-3 py-2 !outline-none"
			/>
			<button class={messageInput ? 'opacity-100' : 'opacity-0'} onclick={sendMessage}>
				Send
			</button>
		</div>
	</div>
</div>
