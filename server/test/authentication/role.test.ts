import request from 'supertest';
import { ADMIN_ROLE, DEFAULT_ROLE } from 'shared';
import { baseUrl, setToken } from 'test/util';

setToken();

const addRole = async () => request(baseUrl)
	.post('/api/auth/role')
	.send({ role: ADMIN_ROLE, description: '应该拥有所有权限的角色' })
	.set('Authorization', global.token)
	.set('Accept', 'application/json')
	.expect('Content-Type', /json/);

describe('auth/roleList', () => {
	it('should get role list', async () => {
		const res = await request(baseUrl)
		// get和post搞错也要排查好久
			.get('/api/auth/roleList')
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
		expect(res.statusCode).toEqual(401);
	});
});

describe('auth/role', () => {
	it('should add role', async () => {
		const res = await addRole();
		expect(res.statusCode).toEqual(200);
	});

	it('should fail from adding role repeatedly', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/role')
			.send({ role: DEFAULT_ROLE, description: '默认角色' })
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(403);
	});
});

describe('auth/role', () => {
	it('should edit role', async () => {
		const res = await request(baseUrl)
			.patch('/api/auth/role')
			.send({ role: ADMIN_ROLE, description: '测试改描述' })
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(200);
	});

	it('should fail to edit role', async () => {
		const res = await request(baseUrl)
			.patch('/api/auth/role')
			.send({ role: '不存在的角色', description: '乱来' })
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(400);
	});
});

describe('auth/role', () => {
	it('should remove role', async () => {
		const res = await request(baseUrl)
			.delete('/api/auth/role')
			.send({ role: ADMIN_ROLE })
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(200);
	});

	it('should fail from removing default role', async () => {
		const res = await request(baseUrl)
			.delete('/api/auth/role')
			.send({ role: DEFAULT_ROLE })
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(403);
	});
});
