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

	it('should fail from uploading empty', async () => {
		const res = await request(baseUrl)
			.post('/api/upload/avatar')
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(403);
	});

	it('should fail from uploading too big image', async () => {
		const res = await request(baseUrl)
			.post('/api/upload/avatar')
			.attach('avatar', resolve(__dirname, './wlop.jpg'))
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(504);
	});

	it('should fail from uploading wrong file type', async () => {
		const res = await request(baseUrl)
			.post('/api/upload/avatar')
			.attach('avatar', resolve(__dirname, './后台系统——登陆与权限.drawio'))
			.set('Authorization', global.token);

		expect(res.statusCode).toEqual(403);
	});
});