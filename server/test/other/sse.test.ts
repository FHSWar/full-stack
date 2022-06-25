import request from 'supertest';
import { baseUrl, setToken } from 'test/util';

setToken();

describe('sse', () => {
	it('should respond as expected', async () => {
		const res = await request(baseUrl)
			.get('/api/sse')
			.set('Accept', 'text/event-stream')
			.set('Authorization', global.token)
			.expect(200);

		expect(res.text).not.toBeUndefined();
	});
});