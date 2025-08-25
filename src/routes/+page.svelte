<script lang="ts">
	import { sidebarOpen, showWelcomeScreen, activeChatID, chats } from '../lib/stores.js';
	import Sidebar from '../lib/components/Sidebar.svelte';
	import ChatArea from '../lib/components/ChatArea.svelte';
	import PreviewArea from '../lib/components/PreviewArea.svelte';
	import WelcomeScreen from '../lib/components/WelcomeScreen.svelte';
	import { onMount } from 'svelte';
	import type { ChatItem } from '../constants/storeTypes.js';
	import { API_BASE_URL } from '$lib/API/requests.js';

	function toggleSidebar() {
		sidebarOpen.update((n) => !n);
	}

	// let chats = $state("initdata");

	onMount(async () => {
		await fetch(`${API_BASE_URL}/posts/1`)
			.then((res) => res.json())
			.then((data: ChatItem[]) => {
				console.log('apidata =>', data);
				chats.set(data);
			});
	});
</script>

<div class="flex h-screen bg-background w-screen max-w-screen overflow-hidden">
	<!-- Sidebar -->
	<Sidebar />

	<!-- Main Content -->
	<div class="flex flex-1 flex-col overflow-hidden lg:ml-0">
		<!-- Mobile Header -->
		<div class="bg-card flex items-center justify-between border-b border-gray-500 p-4 lg:hidden">
			<button
				class="hover:bg-muted rounded p-2"
				onclick={toggleSidebar}
				aria-label="Toggle Sidebar"
			>
				<svg class="h-5 w-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					></path>
				</svg>
			</button>
			<h1 class="text-lg font-semibold text-primary">Chat App</h1>
		</div>

		<!-- Conditional layout: welcome screen or chat interface -->
		{#if $showWelcomeScreen}
			<WelcomeScreen />
		{:else}
			<div class="flex flex-1">
				<div class="w-6/12">
					<ChatArea />
				</div>
				<div class="w-6/12 border-l border-gray-500 overflow-hidden h-full">
					<PreviewArea />
				</div>
			</div>
		{/if}
	</div>
</div>
