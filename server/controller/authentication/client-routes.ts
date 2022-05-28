import { ClientRoutes } from 'model/client-routes';
import { User } from 'model/user';
import { useRouter } from '@util';

const router = useRouter();

router.get('auth/routesByRole', async (ctx) => {
	const routesArr = await ClientRoutes.find();

	toCliect(ctx, { routes: routesArr[0].routesJson });
});

router.post('auth/updateRoutes', async (ctx) => {
	const { role, routes } = ctx.request.body;

	const roleDoc = await User.findOne({ role, isDelete: false });
	if (!roleDoc) return toCliect(ctx, '无对应角色', STATUS.FORBIDDEN);

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

	toCliect(ctx, `已更新${role}对应路由`);
});

export default router;