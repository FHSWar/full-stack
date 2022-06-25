import request from 'supertest';
import { ADMIN_ROLE, DEFAULT_ROLE, encryptPassword } from 'shared';
import { baseUrl, setToken } from 'test/util';

setToken();

const addRole = async () => request(baseUrl)
	.post('/api/auth/addRole')
	.send({ role: ADMIN_ROLE, description: '应该拥有所有权限的角色' })
	.set('Authorization', global.token)
	.set('Accept', 'application/json')
	.expect('Content-Type', /json/);

const appointPermission = async (cb?: ()=>Promise<'OK'>) => {
	// 判空，执行函数，断言都在一行里完成，紧凑得很
	if (cb) expect(await cb()).toBe('OK');

	return request(baseUrl)
		.post('/api/auth/appointPermission')
		.send({ roles: [DEFAULT_ROLE] })
		.set('Authorization', global.token)
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/);
};

// 让单测进到无redis情况的分支，直接await返回时await可以省略
const asyncCallback = async () => redis.ltrim('permittedRoleArr', 1, 0);

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
	it('should add role', async () => {
		const res = await addRole();
		expect(res.statusCode).toEqual(200);
	});

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

describe('auth/appointPermission', () => {
	it('should appoint permission to all roles', async () => {
		await addRole();
		const res = await request(baseUrl)
			.post('/api/auth/appointPermission')
			.send({ roles: [] })
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(200);
	});

	it('should appoint permission to specific roles', async () => {
		const res = await appointPermission();
		expect(res.statusCode).toEqual(200);
	});

	it('should cover redis empty case', async () => {
		const res = await appointPermission(asyncCallback);
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

// 这里还展示了ADMIN_ROLE只是个概念，落地还需要代码逻辑支撑，这个单元里ADMIN_ROLE还不如DEFAULT_ROLE
describe('diy-middleware.ts', () => {
	it('should cover token expire case', async () => {
		// 注册222
		await request(baseUrl)
			.post('/api/auth/register')
			.send({ username: '222', umNo: 'mock222', password: encryptPassword('222') });
		// 分配角色ADMIN_ROLE给222（改完再登陆才生效）
		await request(baseUrl)
			.post('/api/auth/editUserRoles')
			.send({ um: 'MOCK222', username: '222', roles: [ADMIN_ROLE] })
			.set('Authorization', global.token);
		// 退出
		await request(baseUrl)
			.post('/api/auth/logout')
			.set('Authorization', global.token);

		const res = await appointPermission(asyncCallback);
		expect(res.statusCode).toBe(403);
	});

	it('should cover no permission case', async () => {
		// 以222账号登陆
		const res = await request(baseUrl)
			.post('/api/auth/login')
			.send({
				username: '222',
				password: encryptPassword('222')
			});
		global.token = res.body.token;

		// 确认角色已变更
		const userInfo = await request(baseUrl)
			.get('/api/auth/userInfo')
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);

		expect(userInfo.body.userInfo.roles.length).toEqual(1);
		expect(userInfo.body.userInfo.roles[0]).toEqual(ADMIN_ROLE);

		const res1 = await appointPermission(asyncCallback);
		expect(res1.statusCode).toBe(401);
	});
});