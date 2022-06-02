import { useRouter } from '@util';
import { defaultRole } from 'config';
import { Role } from 'model/role';

const router = useRouter();

// 获取角色列表
router.get('auth/roleList', async (ctx) => {
	const list = await Role.find({ isDelete: false });

	toCliect(ctx, {
		list: list.map(({
			role,
			description,
			isPermitted,
			createdAt,
			updatedAt
		}) => ({ role, description, isPermitted, createdAt, updatedAt })),
		message: '角色列表'
	});
});

// 新增角色，角色名唯一
router.post('auth/addRole', async (ctx) => {
	const { role, description } = ctx.request.body;
	if (!role || !description) {
		toCliect(ctx, '无效提交', STATUS.FAILURE);
		return;
	}

	const result = await Role.findOne({ role, isDelete: false });

	if (result) return toCliect(ctx, '角色已存在', STATUS.FORBIDDEN);

	await new Role({ role, description }).save();

	toCliect(ctx, `已新增${role}`);
});

// 编辑角色，只能编辑描述
router.post('auth/editRole', async (ctx) => {
	const { role, description } = ctx.request.body;

	await Role.updateOne({ role, isDelete: false }, { description });
	toCliect(ctx, `已更新${role}描述`);
});

// 移除角色，逻辑删除
router.post('auth/removeRole', async (ctx) => {
	const { role } = ctx.request.body;

	if (role === defaultRole) return toCliect(ctx, `默认角色“${defaultRole}”不可删除`, STATUS.FORBIDDEN);

	await Role.updateOne({ role, isDelete: false }, { isDelete: true });
	toCliect(ctx, `已移除${role}`);
});

// 指派有权限操作数据库的角色
router.post('auth/appointPermission', async (ctx) => {
	const { roles: appointedRoleArr } = ctx.request.body;
	const isEmpty = !appointedRoleArr || appointedRoleArr.length === 0;

	await Role.updateMany({ isDelete: false }, { isPermitted: false });
	isEmpty
		// 传空就是所有角色都有权限，初始状态就是这样
		? await Role.updateMany({ isDelete: false }, { isPermitted: false })
		// 指定即将指定的角色加入有权限的白名单
		: await Role.find({
			isDelete: false,
			$or: (appointedRoleArr as string[]).map((role) => ({ role }))
		}).updateMany({ isPermitted: true });

	toCliect(ctx, `有权限角色已变更为${isEmpty ? '所有角色' : appointedRoleArr}`);
});

export default router;