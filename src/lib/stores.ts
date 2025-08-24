import { derived, writable } from 'svelte/store';
import type { ChatItem } from '../constants/storeTypes';

export const sidebarOpen = writable(false);
export const settingsOpen = writable(false);
export const apiKey = writable('');
export const chats = writable<ChatItem[]>([
	// { id: 1, name: "Chat 1", active: false },
	// { id: 2, name: "Chat 2", active: false },
	// { id: 3, name: "Chat 3", active: false },
]);
export const messages = writable([]);
export const activeChatID = writable<number | null>();
export const activeConversation = derived([chats, activeChatID], ([$chats, $activeChatID]) =>
	$chats.find((item) => item.id === $activeChatID)?.conversations
);

export const showWelcomeScreen = writable(true);
export const generatedCode = derived(activeConversation, ($activeConversation) => $activeConversation?.find((item)=> item.role == 'assistant')?.content?.html || '');
