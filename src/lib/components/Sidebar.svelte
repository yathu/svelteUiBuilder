<script lang="ts">
  import { sidebarOpen, settingsOpen, chats, activeChatID, showWelcomeScreen, activeVersion, activeMaxVersion, activeConversations } from '../stores.js';
  import Settings from './Settings.svelte';

  function toggleSettings() {
    settingsOpen.update(n => !n);
  }

  function selectChat(chatId:number) {

    activeVersion.set(0);
    activeChatID.set(chatId);
    ($activeConversations && activeVersion.set($activeConversations?.length - 1))
    showWelcomeScreen.set(false);
  }

  function newChat() {
    activeChatID.set(null);
    showWelcomeScreen.set(true);
  }

  function closeSidebar() {
    sidebarOpen.set(false);
  }
</script>

<!-- Mobile backdrop -->
{#if $sidebarOpen}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onclick={closeSidebar} onkeydown={(e) => e.key === 'Escape' && closeSidebar()} role="button" tabindex="0"></div>
{/if}

<!-- Sidebar -->
<div class="fixed inset-y-0 left-0 z-50 w-64 min-w-52 bg-surface border-r border-white/10 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 {$sidebarOpen ? 'translate-x-0' : '-translate-x-full'}" role="navigation">
  <div class="flex flex-col h-full">
    <!-- Updated header with settings icon and new chat button -->
    <div class="flex items-center justify-between p-4 border-b border-white/10">
      <div class="flex items-center gap-3 w-full">
        <!-- Settings Icon -->
        <button 
          class="p-2 rounded"
          onclick={toggleSettings}
          aria-label="Toggle settings"
        >
          <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </button>
        
        <button 
          class="flex items-cente text-sm gap-2 px-3 py-2 bg-gray-700 flex-1 text-white justify-center cursor-pointer rounded transition-colors"
          onclick={newChat}
          aria-label="Start new chat"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          New Chat
        </button>
      </div>
      
      <button 
        class="lg:hidden p-1 rounded hover:bg-gray-100"
        onclick={closeSidebar}
        aria-label="Close sidebar"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Settings Panel -->
    {#if $settingsOpen}
      <Settings />
    {/if}

    <!-- Chat List -->
    <div class="flex-1 p-4">
      <h2 class="text-sm font-medium text-white/30 mb-3">Chats</h2>
      <div class="space-y-2">
        {#each $chats as chat}
          <button 
            class="w-full text-left p-2 rounded hover:bg-white/5 transition-colors {chat.id == $activeChatID ? 'bg-white/5 text-primary' : 'text-secondary'}"
            onclick={() => selectChat(chat.id)}
            aria-label="Select chat: {chat.name}"
          >
            {chat.name}
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>
