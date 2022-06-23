import { resolve } from 'path';
import request from 'supertest';
import { baseUrl, setToken } from 'test/util';

setToken();

describe('upload/avatar', () => {
	it('should upload avatar image', async () => {
		const res = await request(baseUrl)
			.post('/api/upload/avatar')
			.attach('avatar', resolve(__dirname, './我.jpg'))
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(200);
	});

	it('should fail from not having token', async () => {
		const res = await request(baseUrl)
		// get和post搞错也要排查好久
			.get('/api/auth/roleList')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(403);
		console.log('asdfasdf', res.body);
	});
});