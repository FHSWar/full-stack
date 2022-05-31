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

// todo: 完成后这里只有admin权限用户能操作
router.post('auth/editUserRoles', async (ctx) => {
	// verifyToken(header.authorization?.replace('Bearer ', '')) as IUser;
	const { um, username, roles } = ctx.request.body;

	const roleArr = (roles as string[]).map((role) => ({ role }));
	const roleDocArr = await Role.find({ $or: roleArr });
	await User.updateOne(
		{ um, username },
		{ roles: roleDocArr.map((roleDoc) => roleDoc._id) }
	);

	toCliect(ctx, '用户角色已更新');
});

// todo: 完成后这里只有admin权限用户能操作
router.post('auth/removeUser', async (ctx) => {
	const { um } = ctx.request.body as IUser;

	// 删除是将isDelete为false的置为isDelete为true
	const res = await User.updateOne({ um, isDelete: false }, { isDelete: true });
	console.log('res', res);

	toCliect(ctx, '用户角色已移除');
});

export default router;