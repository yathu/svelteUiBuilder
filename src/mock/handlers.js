import { http, HttpResponse } from 'msw';

export const handlers = [
	http.get('https://jsonplaceholder.typicode.com/posts/1', async () => {
		return HttpResponse.json({
			data: [
				{ id: 4, name: 'chat next js', active: false },
				{ id: 5, name: 'Chat 5', active: false },
				{ id: 6, name: 'Chat 6', active: false }
			]
		});
	})
];
