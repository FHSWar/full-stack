import { Role } from '@/model/role';
import { IUser, User } from '@/model/user';

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
 * @api {post} /api/auth/editUserRoles 编辑用户角色
 * @apiVersion 1.0.0
 * @apiName editUserRoles
 * @apiGroup user
 * @apiHeader {String} Authorization 用户授权token
 * @apiBody (query) {String} um 用户工号
 * @apiBody (query) {String} username 用户名
 * @apiBody (query) {String[]} roles 角色数组
 */
router.post('auth/editUserRoles', async (ctx) => {
	const { um, username, roles } = ctx.request.body;

	const roleArr = (roles as string[]).map((role) => ({ role }));

	if (roleArr.length === 0) return toCliect(ctx, '用户至少有一个角色', STATUS.FORBIDDEN);

	const roleDocArr = await Role.find({ $or: roleArr });
	await User.updateOne(
		{ um, username, isDelete: false },
		{ roles: roleDocArr.map((roleDoc) => roleDoc._id) }
	);
	toCliect(ctx, '用户角色已更新');
});

/**
 * @api {post} /api/auth/removeUser 移除用户
 * @apiVersion 1.0.0
 * @apiName removeUser
 * @apiGroup user
 * @apiHeader {String} Authorization 用户授权token
 * @apiBody (query) {String} um 用户工号
 */
router.post('auth/removeUser', async (ctx) => {
	const { um } = ctx.request.body as IUser;

	// 删除是将isDelete为false的置为isDelete为true
	await User.updateOne({ um, isDelete: false }, { isDelete: true });

	toCliect(ctx, '用户角色已移除');
});

export default router;