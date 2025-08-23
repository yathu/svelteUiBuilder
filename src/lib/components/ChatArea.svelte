<script>
  import { messages } from '../stores.js';
  
  let messageInput = $state('');
  
  function sendMessage() {
    if (messageInput.trim()) {
      messages.update(msgs => [
        ...msgs,
        { id: Date.now(), type: 'user', content: messageInput.trim() }
      ]);
      messageInput = '';
      
      // Simulate assistant response
      setTimeout(() => {
        messages.update(msgs => [
          ...msgs,
          { id: Date.now() + 1, type: 'assistant', content: 'I understand your request. Let me help you with that.' }
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
</script>

<div class="flex flex-col h-full">
  <!-- Messages -->
  <div class="flex-1 overflow-y-auto p-4 space-y-4">
    {#each $messages as message}
      <div class="flex {message.type === 'user' ? 'justify-end' : 'justify-start'}">
        <!-- Updated user message color to use teal primary color -->
        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg {message.type === 'user' ? 'bg-[#00B6B4] text-white' : 'bg-gray-100 text-gray-900'}">
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
        class="flex-1 px-3 py-2 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-[#00B6B4]"
      />
      <button 
        class="btn-primary"
        onclick={sendMessage}
      >
        Send
      </button>
    </div>
  </div>
</div>
