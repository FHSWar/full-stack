import { defaultRole } from 'config';
import { ClientRoutes, IClientRoutes } from 'model/client-routes';
import { Role } from 'model/role';
import { IUser } from 'model/user';
import { useRouter, verifyToken } from '@util';

const router = useRouter();

router.get('auth/routesByRole', async (ctx) => {
	const { role } = ctx.query as {role?: string};
	const { header } = ctx.request;
	const { roles } = verifyToken(header.authorization?.replace('Bearer ', '')) as IUser;

	const findRoutesJsonByRoleId = async (id: IClientRoutes['role']) => {
		const routesDoc = await ClientRoutes.findOne({ role: id, isDelete: false });
		if (routesDoc !== null) return toCliect(ctx, { routes: routesDoc.routesJson });

		toCliect(ctx, {
			routes: JSON.stringify([]),
			message: '无对应角色的菜单'
		}, STATUS.OVERTIME);
	};

	if (role) {
		const roleDoc = await Role.findOne({ role, isDelete: false });
		if (roleDoc !== null) await findRoutesJsonByRoleId(roleDoc._id);
		return;
	}

	const roleDoc = await Role.findOne({ role: roles[0], isDelete: false });
	if (roleDoc !== null) await findRoutesJsonByRoleId(roleDoc._id);
	else {
		// 删除了原有角色，又未分配新角色，就返回访客的菜单
		const fallbackRoleDoc = await Role.findOne({ role: defaultRole });
		const routesDoc = await ClientRoutes.findOne({ role: fallbackRoleDoc!._id });

		if (routesDoc !== null) return toCliect(ctx, { routes: routesDoc.routesJson });
	}
});

// 更新对应角色的菜单
router.post('auth/updateRoutesByRole', async (ctx) => {
	const { role, routes } = ctx.request.body;

	let roleDoc = await Role.findOne({ role, isDelete: false });
	if (!roleDoc) {
		await new Role({ role, description: '默认描述' }).save();
		roleDoc = await Role.findOne({ role, isDelete: false });
	}

	if (roleDoc === null) return toCliect(ctx, '让TS安心');

	const routesDoc = await ClientRoutes.findOne({ role: roleDoc._id, isDelete: false });
	if (routesDoc) {
		// 少一个await，浪费一个钟排查
		await ClientRoutes.updateOne(
			{ role: roleDoc._id, isDelete: false },
			{ routesJson: JSON.stringify(routes) }
		);
	} else {
		await new ClientRoutes({
			role: roleDoc._id,
			routesJson: JSON.stringify(routes)
		}).save();
	}

	toCliect(ctx, `已更新${role}对应菜单`);
});

export default router;