<script>
  import { apiKey } from '../stores.js';
  
  let inputValue = $state($apiKey);
  
  function saveApiKey() {
    apiKey.set(inputValue);
  }
</script>

<div class="p-4 border-b border-white/10">
  <h3 class="text-sm font-medium mb-2">API Configuration</h3>
  <div class="space-y-2">
    <input 
      type="password"
      placeholder="Enter API key..."
      bind:value={inputValue}
      class="w-full px-3 py-2 border border-gray-500 rounded text-sm !outline-none"
    />
    <button 
      class="bg-gray-700 rounded hover:cursor-pointer text-sm px-3 py-1"
      onclick={saveApiKey}
    >
      Save
    </button>
  </div>
</div>
