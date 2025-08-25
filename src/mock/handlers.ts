import { delay, http, HttpResponse } from 'msw';
import { chats, newChatItem, singleConversation } from './data';
import type { ChatItem, Conversations } from '../constants/storeTypes';
import { API_BASE_URL } from '$lib/API/requests';

export const handlers = [
	http.all('*', async () => {
		await delay(500);
	}),

	http.get<never,never, ChatItem[], string>(`${API_BASE_URL}/posts/1`, async () => {
		return HttpResponse.json(chats);
	}),

	http.post<never, never, Conversations>(`${API_BASE_URL}/chat`, async ({ request }) => {
		const parms = await request.json();
		console.log('parms=>', parms);
		return HttpResponse.json(singleConversation, { status: 200 });
	}),

	http.post<never, any, ChatItem>(`${API_BASE_URL}/newChat`, async ({ request }) => {
		const parms = await request.json();
		console.log('parms=>', parms);
		return HttpResponse.json({...newChatItem, ...{id:Date.now(), name:parms?.message || 'new chat'}}, { status: 200 });
	}),
];
