import request from 'supertest';
import { getToken } from 'test/util';

const baseUrl = 'http://localhost:9000';

getToken();
describe('auth/userList', () => {
	it('should get users', async () => {
		const res = await request(baseUrl)
			.get('/api/auth/userList')
			.set('Authorization', global.token);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('list');
	});

	it('should fail to get users', async () => {
		const res = await request(baseUrl)
			.get('/api/auth/userList')
			.set('Authorization', 'Bear wrong');
		expect(res.statusCode).toEqual(403);
		console.log('res', res.body);
	});
});

// describe('auth/editUserRoles', () => {});