<script>
	import { onMount } from 'svelte';
	import { messages } from '../stores.js';

	let messageInput = $state('');
	let response = $state('console.log("ccc")');

	function sendMessage() {
		if (messageInput.trim()) {
			messages.update((msgs) => [
				...msgs,
				{ id: Date.now(), type: 'user', content: messageInput.trim() }
			]);
			messageInput = '';

			// Simulate assistant response
			setTimeout(() => {
				messages.update((msgs) => [
					...msgs,
					{
						id: Date.now() + 1,
						type: 'assistant',
						content: 'I understand your request. Let me help you with that.'
					}
				]);
			}, 1000);
		}
	}

	function handleKeydown(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}

	onMount(async ()=>{
	  fetch("https://jsonplaceholder.typicode.com/posts/1").then(res => res.json()).then(data=> {
	    console.log("apidata=>",data);
	    response = data;
	  })
	})
</script>

<div class="flex h-full flex-col">
	<div class="bg-gray-600 text-white">
		APIRES
		<pre>
      {response?.body}
    </pre>
	</div>

	<!-- Messages -->
	<div class="flex-1 space-y-4 overflow-y-auto p-4">
		{#each $messages as message}
			<div class="flex {message.type === 'user' ? 'justify-end' : 'justify-start'}">
				<!-- Updated user message color to use teal primary color -->
				<div
					class="max-w-xs rounded-lg px-4 py-2 lg:max-w-md {message.type === 'user'
						? 'bg-[#00B6B4] text-white'
						: 'bg-gray-100 text-gray-900'}"
				>
					{message.content}
				</div>
			</div>
		{/each}
	</div>

	<!-- Input Area -->
	<div class="border-t border-gray-500 p-4">
		<div class="flex gap-2">
			<input
				type="text"
				placeholder="Type your message..."
				bind:value={messageInput}
				onkeydown={handleKeydown}
				class="flex-1 rounded border border-gray-500 px-3 py-2 focus:ring-2 focus:ring-[#00B6B4] focus:outline-none"
			/>
			<button class="btn-primary" onclick={sendMessage}> Send </button>
		</div>
	</div>
</div>
