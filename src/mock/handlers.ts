import { delay, http, HttpResponse } from 'msw';
import { chats, singleConversation } from './data';
import type { ChatItem, Conversations } from '../constants/storeTypes';

export const handlers = [
	http.all('*', async () => {
		await delay(500);
	}),

	http.get<never,never, ChatItem[], string>('https://jsonplaceholder.typicode.com/posts/1', async () => {
		return HttpResponse.json(chats);
	}),

	http.post<never, never, Conversations>('https://jsonplaceholder.typicode.com/newChat', async ({ request }) => {
		const parms = await request.json();
		console.log('parms=>', parms);
		return HttpResponse.json(singleConversation, { status: 200 });
	}),
];
