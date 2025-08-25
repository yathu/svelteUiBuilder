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
export const showWelcomeScreen = writable(true);

export const activeConversations = derived([chats, activeChatID], ([$chats, $activeChatID,]) =>
	$chats.find((item) => item.id === $activeChatID)?.conversations);

export const activeMaxVersion = derived(activeConversations, ($activeConversations) => $activeConversations ? $activeConversations?.length - 1 : 0);

export const activeVersion = writable(0);

// activeMaxVersion.subscribe((max) => {
//   activeVersion.update((v) => (v > max ? max : v));
// });

export const activeConversation = derived([activeConversations, activeVersion], ([$activeConversations, $activeVersion]) =>
	$activeConversations ? $activeConversations[$activeVersion].conversation : null);

export const generatedCode = derived([activeConversation] , ([$activeConversation]) => {
	return $activeConversation ? $activeConversation.find(item => item.role == 'assistant')?.content.html : '';
})
