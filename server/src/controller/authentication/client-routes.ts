import { uniqBy } from 'lodash';
import { assembleTree, DEFAULT_ROLE, flattenMenuTree, MenuTree } from 'shared';
import { ClientRoutes, IClientRoutes } from '@/model/client-routes';
import { Role } from '@/model/role';
import { IUser } from '@/model/user';
import { verifyToken } from '@/util';

const router = useRouter();

/**
 * @api {get} /api/auth/routesByRole 获取客户端菜单
 * @apiVersion 1.0.0
 * @apiName routesByRole
 * @apiGroup client-routes
 * @apiHeader {String} Authorization 用户授权token
 * @apiParam (query) {String} [role] 用户角色
 */
router.get('auth/routesByRole', async (ctx) => {
	const { role } = ctx.query as {role?: string};
	const { header } = ctx.request;

	const { token } = verifyToken(header.authorization?.replace('Bearer ', '') as string);
	const { roles } = token as Omit<IUser, 'password'>;

	const findRoutesJsonByRoleId = async (id: IClientRoutes['role']) => {
		const routesDoc = await ClientRoutes.findOne({ role: id, isDelete: false }).lean();
		if (routesDoc !== null) return toCliect(ctx, { routes: routesDoc.routesJson });

		toCliect(ctx, {
			routes: JSON.stringify([]),
			message: '无对应角色的菜单'
		}, STATUS.FAILURE);
	};

	const findRoutesJsonByRoles = async () => {
		const roleDocArr = await Role.find({
			role: { $in: roles },
			isDelete: false
		}).lean();
		const roleObjectIdArr = roleDocArr.map((item) => item._id);
		const clientRoutesDocArr = await ClientRoutes.find({
			role: { $in: roleObjectIdArr },
			isDelete: false
		});
		const flattenedRoutes = clientRoutesDocArr.reduce((acc, cur) => {
			acc.push(...flattenMenuTree(JSON.parse(cur.routesJson)));
			return acc;
		}, [] as MenuTree);

		return {
			isEmpty: flattenedRoutes.length === 0,
			routesJson: JSON.stringify(assembleTree(uniqBy(flattenedRoutes, 'id')))
		};
	};

	// 带参请求的是单个对应角色的路由
	if (role) {
		const roleDoc = await Role.findOne({ role, isDelete: false }).lean();
		if (roleDoc !== null) await findRoutesJsonByRoleId(roleDoc._id);
		return;
	}

	// 不带参请求的是可能为多角色的用户的菜单
	const { isEmpty, routesJson } = await findRoutesJsonByRoles();
	if (isEmpty) {
		// 删除了原有角色，又未分配新角色，就返回访客的菜单
		const fallbackRoleDoc = await Role.findOne({ role: DEFAULT_ROLE }).lean();
		const routesDoc = await ClientRoutes.findOne({ role: fallbackRoleDoc!._id }).lean();

		if (routesDoc !== null) {
			return toCliect(
				ctx,
				{
					routes: routesDoc.routesJson,
					message: `角色无对应路由，回退到${DEFAULT_ROLE}路由`
				}
			);
		}
		return toCliect(ctx, {
			routes: JSON.stringify([]),
			message: '无对应角色的菜单'
		}, STATUS.FAILURE);
	}

	toCliect(ctx, { routes: routesJson });
});

/**
 * @api {post} /api/auth/updateRoutesByRole 更新对应角色的菜单
 * @apiVersion 1.0.0
 * @apiName updateRoutesByRole
 * @apiGroup client-routes
 * @apiBody (query) {String} role 用户角色
 * @apiBody (query) {String} routes 用户菜单
 */
router.post('auth/updateRoutesByRole', async (ctx) => {
	const { role, routes } = ctx.request.body;

	let roleDoc = await Role.findOne({ role, isDelete: false }).lean();
	if (!roleDoc) {
		await new Role({ role, description: '默认描述' }).save();
		roleDoc = await Role.findOne({ role, isDelete: false }).lean();
	}

	if (roleDoc === null) return toCliect(ctx, '让TS安心');

	const routesDoc = await ClientRoutes.findOne({ role: roleDoc._id, isDelete: false }).lean();
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