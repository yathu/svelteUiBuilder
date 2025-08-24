import { http, HttpResponse } from 'msw';
import { chats } from './data';
import type { ChatItem } from '../constants/storeTypes';

export const handlers = [
	// http.all('*', async () => {
	// 	await delay(1000);
	// }),

	http.get<never,never, ChatItem[], string>('https://jsonplaceholder.typicode.com/posts/1', async () => {
		return HttpResponse.json(chats);
	})
];
