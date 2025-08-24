<script>
  import { sidebarOpen, showWelcomeScreen, activeChat, chats } from '../lib/stores.js';
  import Sidebar from '../lib/components/Sidebar.svelte';
  import ChatArea from '../lib/components/ChatArea.svelte';
  import PreviewArea from '../lib/components/PreviewArea.svelte';
  import WelcomeScreen from '../lib/components/WelcomeScreen.svelte';
	import { onMount } from 'svelte';
  
  function toggleSidebar() {
    sidebarOpen.update(n => !n);
  }

  // let chats = $state("initdata");

  	onMount(async ()=>{
	  await fetch("https://jsonplaceholder.typicode.com/posts/1").then(res => res.json()).then(data=> {
	    console.log("apidata =>",data);
      chats.set(data?.data);
	  })
	})
  
</script>

<div class="flex h-screen bg-background">
  <!-- Sidebar -->
  <Sidebar />
  
  <!-- Main Content -->
  <div class="flex-1 flex flex-col lg:ml-0">
    <!-- Mobile Header -->
    <div class="lg:hidden flex items-center justify-between p-4 border-b border-gray-500 bg-card">
      <button 
        class="p-2 rounded hover:bg-muted"
        onclick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <svg class="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <h1 class="text-lg font-semibold text-primary">Chat App</h1>
      <div class="w-9"></div>
    </div>
    
    <!-- Conditional layout: welcome screen or chat interface -->
    {#if $showWelcomeScreen}
      <WelcomeScreen />
    {:else}
      <div class="flex-1 flex">
        <div class="flex-1">
          <ChatArea />
        </div>
        <div class="w-1/2 border-l border-gray-500">
          <PreviewArea />
        </div>
      </div>
    {/if}
  </div>
</div>
