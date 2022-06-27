import request from 'supertest';
import { encryptPassword } from 'shared';
import { closeMongo, useMongo } from '@/util';
import { server } from '@/../app';

let token: string;

export const baseUrl = 'http://localhost:9000';

const cancelScheduleJobs = () => {
	if (global.scheduler) {
		Object.keys(global.scheduler).forEach((key) => {
			scheduler[key]?.cancel();
		});
	}
};

export const login = async () => {
	const res = await request(baseUrl)
		.post('/api/auth/login')
		.send({
			username: '111',
			password: await encryptPassword('111')
		});
	token = res.body.token;
	global.token = res.body.token;
	return res;
};

export const logout = async () => {
	const res = await request(baseUrl)
		.post('/api/auth/logout')
		.set('Authorization', token);
	return res;
};

export const logoutLogin = async () => {
	// 退出再登录
	await request(baseUrl).post('/api/auth/logout').set('Authorization', token);
	const res = await request(baseUrl).post('/api/auth/login').send({
		username: '111',
		password: await encryptPassword('111')
	});
	const userInfo = await request(baseUrl)
		.get('/api/auth/userInfo')
		.set('Authorization', res.body.token);

	global.token = res.body.token;
	return userInfo;
};

export const register = async () => {
	const res = await request(baseUrl)
		.post('/api/auth/register')
		.send({ username: '111', umNo: 'mock111', password: await encryptPassword('111') })
		.set('Accept', 'application/json');
	return res;
};

export const setHook = () => {
	beforeAll(async () => {
		await useMongo();
		// 测试的时候应该所有角色都有权限，正式环境redis还是会从mongodb里面读到正确的值
		await redis.ltrim('permittedRoleArr', 1, 0);
	});

	afterAll(async () => {
		cancelScheduleJobs();

		await closeMongo();
		redis.quit();
		server.close();
		wss.close();
	});
};

export const setToken = () => {
	setHook();
	describe('set token', () => {
		it('should set token', async () => {
			await register();
			await login();
		}); // it第三个参数给数字就是设置单个测试的超时时间，默认是五秒
	});
};