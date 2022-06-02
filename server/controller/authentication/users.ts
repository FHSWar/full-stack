import { Role } from 'model/role';
import { IUser, User } from 'model/user';
import { useRouter } from '@util';

const router = useRouter();

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

router.post('auth/editUserRoles', async (ctx) => {
	// verifyToken(header.authorization?.replace('Bearer ', '')) as IUser;
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

router.post('auth/removeUser', async (ctx) => {
	const { um } = ctx.request.body as IUser;

	// 删除是将isDelete为false的置为isDelete为true
	const res = await User.updateOne({ um, isDelete: false }, { isDelete: true });
	console.log('res', res);

	toCliect(ctx, '用户角色已移除');
});

export default router;