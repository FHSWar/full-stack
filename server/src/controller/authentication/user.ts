import { IUser, User } from '@/model/user';
// import { Role } from '@/model/role-mysql';

import {
	decryptPassword,
	encryptBySHA512,
	findRoleDocArr,
	generateToken,
	verifyToken
} from '@/util';

const router = useRouter();

/**
 * @api {get} /api/auth/userList 用户列表
 * @apiVersion 1.0.0
 * @apiName userList
 * @apiGroup user
 * @apiHeader {String} Authorization 用户授权token
 */
router.get('auth/userList', async (ctx) => {
	const userList = await User.find({ isDelete: false }).populate('roles');

	const list = userList.map((u) => {
		const { username, um, roles, createdAt, updatedAt } = u;

		return {
			username,
			um,
			createdAt,
			updatedAt,
			roles: roles.filter((v) => !v.isDelete).map((w) => w.role)
		};
	});

	toCliect(ctx, { list });
});

/**
 * @api {get} /api/auth/userInfo 获取登录人信息
 * @apiVersion 1.0.0
 * @apiName userInfo
 * @apiGroup user
 * @apiHeader {String} Authorization 用户授权token
 */
router.get('auth/userInfo', async (ctx) => {
	const { authorization } = ctx.header;

	const { token } = verifyToken((authorization as string).replace('Bearer ', ''));
	const { um, username } = token as Omit<IUser, 'password'>;

	const userInfo = await User.findOne({ um, username }).populate('roles');

	/* await Role.create({ role: '路人甲', description: '王德发' });
	await Role.destroy({
		where: { role: '路人甲' }
	}); */

	if (userInfo) {
		const roleArr = userInfo.roles
			.filter((v) => v.isDelete === false)
			.map((v) => v.role);

		toCliect(ctx, {
			editable: ['username'],
			userInfo: {
				username: userInfo.username,
				um,
				avatar: userInfo?.avatar,
				roles: roleArr
			}
		});
	}
});

/**
 * @api {patch} /api/auth/userRoles 编辑用户角色
 * @apiVersion 1.0.0
 * @apiName editUserRoles
 * @apiGroup user
 * @apiHeader {String} Authorization 用户授权token
 * @apiBody (query) {String} um 用户工号
 * @apiBody (query) {String} username 用户名
 * @apiBody (query) {String[]} roles 角色数组
 */
router.patch('auth/userRoles', async (ctx) => {
	const { um, username, roles } = ctx.request.body;

	try {
		const roleDocArr = await findRoleDocArr(roles as string[]);

		if (roleDocArr.length === 0) return toCliect(ctx, '无效角色', STATUS.FORBIDDEN);

		await User.updateOne(
			{ um, username, isDelete: false },
			{ roles: roleDocArr.map((roleDoc) => roleDoc._id) }
		);
		toCliect(ctx, '用户角色已更新');
	} catch (e) {
		return toCliect(ctx, (e as Error).toString(), STATUS.FORBIDDEN);
	}
});

/**
 * @api {patch} /api/auth/selfInfo 用户自己只能改名字、密码和头像
 * @apiVersion 1.0.0
 * @apiName updateSelfInfo
 * @apiGroup user
 * @apiHeader {String} Authorization 用户授权token
 * @apiBody (query) {String} username 用户名
 * @apiBody (query) {String} [oldPassword] 旧密码
 * @apiBody (query) {String} [password] 新密码
 */
router.patch('auth/selfInfo', async (ctx) => {
	const {
		um,
		username,
		oldPassword,
		password,
		roles
	} = ctx.request.body;
	const userInfo = await User.findOne({ um });

	if (userInfo) {
		userInfo.username = username;

		if (oldPassword) {
			try {
				const oldPasswordSHA = encryptBySHA512(decryptPassword(oldPassword));
				const passwordSHA = encryptBySHA512(decryptPassword(password));

				const userExist = await User.exists({
					um,
					password: oldPasswordSHA,
					isDelete: false
				});

				if (userExist) {
					userInfo.password = passwordSHA;
					await User.updateOne({ um, password: oldPasswordSHA }, userInfo);
				} else {
					return toCliect(ctx, '密码错误', STATUS.FORBIDDEN);
				}
			} catch (e) {
				return toCliect(ctx, (e as Error).toString(), STATUS.FAILURE);
			}
		} else {
			await User.updateOne({ um }, userInfo);
		}

		const bareToken = generateToken({
			roles,
			username,
			um: userInfo.um,
			timeStamp: new Date()
		});

		toCliect(ctx, {
			token: `Bearer ${bareToken}`,
			message: '用户信息已更新'
		});
	}
});

/**
 * @api {delete} /api/auth/user 移除用户
 * @apiVersion 1.0.0
 * @apiName removeUser
 * @apiGroup user
 * @apiHeader {String} Authorization 用户授权token
 * @apiBody (query) {String} um 用户工号
 */
router.delete('auth/user', async (ctx) => {
	const { um } = ctx.request.body as IUser;

	// 删除是将isDelete为false的置为isDelete为true
	await User.updateOne({ um, isDelete: false }, { isDelete: true });

	toCliect(ctx, '用户角色已移除');
});

export default router;