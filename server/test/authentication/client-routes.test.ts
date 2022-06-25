import request from 'supertest';
import { ADMIN_ROLE, DEFAULT_ROLE, encryptPassword, fallbackRoutes } from 'shared';
import { baseUrl, setToken } from 'test/util';
import { Role } from '@/model/role';

setToken();

const addRoutes = async () => {
	const res = await request(baseUrl)
		.post('/api/auth/updateRoutesByRole')
		.send({ role: DEFAULT_ROLE, routes: fallbackRoutes })
		.set('Authorization', global.token);
	return res;
};

describe('auth/routesByRole', () => {
	/* supertest get请求带参数：
		https://stackoverflow.com/questions/40309713/how-to-send-query-string-parameters-using-supertest */
	it('should fail from the role not having routes yet', async () => {
		const res = await request(baseUrl)
			.get('/api/auth/routesByRole')
			.query({ role: DEFAULT_ROLE })
			.set('Authorization', global.token);
		expect(res.statusCode).toEqual(400);
	});

	it('should fail from not having any route met the conditions', async () => {
		const res = await request(baseUrl)
			.get('/api/auth/routesByRole')
			.set('Authorization', global.token);
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty('routes');
	});

	it('should get routes by role', async () => {
		await addRoutes();

		const res = await request(baseUrl)
			.get('/api/auth/routesByRole')
			.query({ role: DEFAULT_ROLE })
			.set('Authorization', global.token);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('routes');
	});

	it('should get default role routes', async () => {
		// 新增角色”路人甲“
		await request(baseUrl)
			.post('/api/auth/addRole')
			.send({ role: '路人甲', description: '路人甲' })
			.set('Authorization', global.token);
		// 注册222
		await request(baseUrl)
			.post('/api/auth/register')
			.send({ username: '222', umNo: 'mock222', password: encryptPassword('222') });
		// 分配角色路人甲给222（改完再登陆才生效）
		await request(baseUrl)
			.patch('/api/auth/userRoles')
			.send({ um: 'MOCK222', username: '222', roles: ['路人甲'] })
			.set('Authorization', global.token);
		// 退出
		await request(baseUrl)
			.post('/api/auth/logout')
			.set('Authorization', global.token);
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
		expect(userInfo.body.userInfo.roles[0]).toEqual('路人甲');
		// 以路人甲身份获取菜单
		const res2 = await request(baseUrl)
			.get('/api/auth/routesByRole')
			.set('Authorization', global.token);
		expect(res2.body.message).toEqual(`角色无对应路由，回退到${DEFAULT_ROLE}路由`);

		// 退出
		await request(baseUrl)
			.post('/api/auth/logout')
			.set('Authorization', global.token);
		// 以111账号登陆，进行其他测试
		const res3 = await request(baseUrl)
			.post('/api/auth/login')
			.send({
				username: '111',
				password: encryptPassword('111')
			});
		global.token = res3.body.token;
	});

	it('should get routes by login roles', async () => {
		const res = await request(baseUrl)
			.get('/api/auth/routesByRole')
			.set('Authorization', global.token);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('routes');
	});
});

describe('auth/updateRoutesByRole', () => {
	it('should update existing routes by role', async () => {
		const res = await addRoutes();
		expect(res.statusCode).toEqual(200);
	});

	it('should add a non-existing role', async () => {
		const roleDoc = await Role.findOne({ role: ADMIN_ROLE, isDelete: false });
		expect(roleDoc).toEqual(null);

		const res = await request(baseUrl)
			.post('/api/auth/updateRoutesByRole')
			.send({ role: ADMIN_ROLE, routes: fallbackRoutes })
			.set('Authorization', global.token);
		expect(res.statusCode).toEqual(200);

		const roleDocAgain = await Role.findOne({ role: ADMIN_ROLE, isDelete: false });
		expect(roleDocAgain).toBeTruthy();
	});
});