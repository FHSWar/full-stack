import { DEFAULT_ROLE } from 'shared';
import { Role } from '@/model/role';

const router = useRouter();

/**
 * @api {get} /api/auth/roleList 获取角色列表
 * @apiVersion 1.0.0
 * @apiName roleList
 * @apiGroup role
 * @apiHeader {String} Authorization 用户授权token
 */
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

/**
 * @api {post} /api/auth/addRole 新增角色，角色名唯一
 * @apiVersion 1.0.0
 * @apiName addRole
 * @apiGroup role
 * @apiHeader {String} Authorization 用户授权token
 * @apiBody (query) {String} role 用户角色
 * @apiBody (query) {String} description 对用户角色的描述
 */
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

/**
 * @api {post} /api/auth/editRole 编辑角色，只能编辑描述
 * @apiVersion 1.0.0
 * @apiName editRole
 * @apiGroup role
 * @apiHeader {String} Authorization 用户授权token
 * @apiBody (query) {String} role 用户角色
 * @apiBody (query) {String} description 对用户角色的描述
 */
router.post('auth/editRole', async (ctx) => {
	const { role, description } = ctx.request.body;

	await Role.updateOne({ role, isDelete: false }, { description });
	toCliect(ctx, `已更新${role}描述`);
});

/**
 * @api {post} /api/auth/removeRole 移除角色，逻辑删除
 * @apiVersion 1.0.0
 * @apiName removeRole
 * @apiGroup role
 * @apiHeader {String} Authorization 用户授权token
 * @apiBody (query) {String} role 用户角色
 */
router.post('auth/removeRole', async (ctx) => {
	const { role } = ctx.request.body;

	if (role === DEFAULT_ROLE) return toCliect(ctx, `默认角色“${DEFAULT_ROLE}”不可删除`, STATUS.FORBIDDEN);

	await Role.updateOne({ role, isDelete: false }, { isDelete: true });
	toCliect(ctx, `已移除${role}`);
});

/**
 * @api {post} /api/auth/appointPermission 指派有权限操作数据库的角色
 * @apiVersion 1.0.0
 * @apiName appointPermission
 * @apiGroup role
 * @apiHeader {String} Authorization 用户授权token
 * @apiBody (query) {String[]} roles 用户角色数组
 */
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

	await redis.ltrim('permittedRoleArr', 1, 0);
	await Promise.all(appointedRoleArr.map((role: string) => redis.lpush('permittedRoleArr', role)));

	toCliect(ctx, `有权限角色已变更为${isEmpty ? '所有角色' : appointedRoleArr}`);
});

export default router;