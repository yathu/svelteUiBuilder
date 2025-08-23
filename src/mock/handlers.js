import { http, HttpResponse } from 'msw';

export const handlers = [
	http.get('https://jsonplaceholder.typicode.com/posts/1', async () => {
		return HttpResponse.json({
			body:"body tes"
		});
	})
];
