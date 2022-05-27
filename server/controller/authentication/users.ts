import { Role } from 'model/role';
import { IUser, User } from 'model/user';
import { useRouter, verifyToken } from '@util';

const router = useRouter();

router.get('auth/userList', async (ctx) => {
	const userList = await User.find({ isDelete: false }).populate('roles');

	const list = userList.map((u) => {
		const { username, um, roles, createTime, updateTime } = u;

		return {
			username,
			um,
			createTime,
			updateTime,
			roles: roles.filter((v) => !v.isDelete).map((w) => w.role)
		};
	});

	toCliect(ctx, { list });
});

// todo: 完成后这里只有admin权限用户能操作
router.post('auth/editUserRoles', async (ctx) => {
	const { header, request } = ctx;
	const { um, username } = verifyToken(header.authorization?.replace('Bearer ', '')) as IUser;

	const roleArr = (request.body as IUser).roles.map((role) => ({ role }));
	const roleDocArr = await Role.find({ $or: roleArr });
	await User.updateOne({ um, username }, { roles: roleDocArr.map((roleDoc) => roleDoc._id) });

	toCliect(ctx, '用户角色已更新');
});

// todo: 完成后这里只有admin权限用户能操作
router.post('auth/removeUser', async (ctx) => {
	const { um } = ctx.request.body as IUser;

	await User.updateOne({ um }, { isDelete: true });

	toCliect(ctx, '用户角色已移除');
});

export default router;