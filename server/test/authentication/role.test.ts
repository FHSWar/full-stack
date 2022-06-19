import request from 'supertest';
import { ADMIN_ROLE, DEFAULT_ROLE } from 'shared';
import { baseUrl, setToken } from 'test/util';

setToken();

const addRole = () => {
	it('should add role', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/addRole')
			.send({ role: ADMIN_ROLE, description: '应该拥有所有权限的角色' })
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(200);
	});
};

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
		expect(res.statusCode).toEqual(403);
	});
});

describe('auth/addRole', () => {
	addRole();

	it('should fail from adding role repeatedly', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/addRole')
			.send({ role: DEFAULT_ROLE, description: '默认角色' })
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(403);
	});
});

describe('auth/editRole', () => {
	it('should edit role', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/editRole')
			.send({ role: ADMIN_ROLE, description: '测试改描述' })
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(200);
	});

	it('should fail to edit role', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/editRole')
			.send({ role: '不存在的角色', description: '乱来' })
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(400);
	});
});

describe('auth/removeRole', () => {
	it('should remove role', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/removeRole')
			.send({ role: ADMIN_ROLE })
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(200);
	});

	it('should fail from removing default role', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/removeRole')
			.send({ role: DEFAULT_ROLE })
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(403);
	});
});

describe('auth/appointPermission', () => {
	addRole();

	it('should appoint permission to all roles', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/appointPermission')
			.send({ roles: [] })
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(200);
	});

	it('should appoint permission to specific roles', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/appointPermission')
			.send({ roles: [DEFAULT_ROLE] })
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(200);
	});

	it('should from appoint permission to non-existing role', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/appointPermission')
			.send({ roles: ['不存在的角色'] })
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(400);
	});
});
