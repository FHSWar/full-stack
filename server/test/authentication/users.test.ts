import request from 'supertest';
import { DEFAULT_ROLE } from 'shared';
import { baseUrl, setToken, logoutLogin } from 'test/util';
import { Role } from '@/model/role';
import { User } from '@/model/user';

const ADMIN_ROLE = '管理员';

setToken();

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
		expect(res.statusCode).toEqual(500);
	});
});

describe('auth/editUserRoles', () => {
	it('should pass on edit user roles', async () => {
		await new Role({
			role: ADMIN_ROLE,
			description: '一般是拥有所有权限的角色'
		}).save();
		const res = await request(baseUrl)
			.post('/api/auth/editUserRoles')
			.send({ um: 'MOCK111', username: '111', roles: [ADMIN_ROLE] })
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(200);
	});
	it('should login as 管理员', async () => {
		const userInfo = await logoutLogin();

		expect(userInfo.body.userInfo.roles.length).toEqual(1);
		expect(userInfo.body.userInfo.roles[0]).toEqual(ADMIN_ROLE);
	});

	it('should have no role', async () => {
		await Role.updateOne(
			{ role: ADMIN_ROLE, isDelete: false },
			{ isDelete: true }
		);

		const user = await User.findOne({ username: '111' }).populate('roles');
		expect(user?.roles.filter((role) => !role.isDelete).length).toEqual(0);
	});

	it(`should login as ${DEFAULT_ROLE}`, async () => {
		const userInfo = await logoutLogin();

		expect(userInfo.body.userInfo.roles.length).toEqual(1);
		expect(userInfo.body.userInfo.roles[0]).toEqual(DEFAULT_ROLE);
	});
});