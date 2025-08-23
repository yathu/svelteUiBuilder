<script>
  import { showWelcomeScreen, messages } from '../stores.js';
  
  let inputValue = $state('');
  
  function handleSubmit() {
    if (inputValue.trim()) {
      messages.update(msgs => [...msgs, { 
        id: Date.now(), 
        type: 'user', 
        content: inputValue.trim() 
      }]);
      showWelcomeScreen.set(false);
      inputValue = '';
    }
  }
  
  function handleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }
</script>

<div class="flex-1 flex items-center justify-center p-8">
  <div class="max-w-2xl w-full text-center">
    <!-- Welcome heading like v0 -->
    <h1 class="text-4xl md:text-5xl font-bold text-white mb-8">
      What can I help you build?
    </h1>
    
    <!-- Large input area with teal accent -->
    <div class="relative mb-6">
      <textarea
        bind:value={inputValue}
        onkeydown={handleKeydown}
        placeholder="Ask me to build..."
        class="w-full p-4 pr-12 text-lg border border-gray-300 rounded-xl resize-none focus:border-primary !outline-none bg-surface text-white placeholder-gray-500"
        rows="3"
      ></textarea>
      
      <button
        onclick={handleSubmit}
        disabled={!inputValue.trim()}
        class="absolute right-3 bottom-3 p-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Send message"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
        </svg>
      </button>
    </div>
    
  </div>
</div>
