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
			createdAt,
			updatedAt
		}) => ({ role, description, createdAt, updatedAt }))
	});
});

/**
 * @api {post} /api/auth/role 新增角色，角色名唯一
 * @apiVersion 1.0.0
 * @apiName addRole
 * @apiGroup role
 * @apiHeader {String} Authorization 用户授权token
 * @apiBody (query) {String} role 用户角色
 * @apiBody (query) {String} description 对用户角色的描述
 */
router.post('auth/role', async (ctx) => {
	const { role, description } = ctx.request.body;

	try {
		await new Role({ role, description }).save();
	} catch (e) {
		return toCliect(ctx, (e as Error).toString(), STATUS.FORBIDDEN);
	}

	toCliect(ctx, `已新增${role}`);
});

/**
 * @api {patch} /api/auth/role 编辑角色，只能编辑描述
 * @apiVersion 1.0.0
 * @apiName editRole
 * @apiGroup role
 * @apiHeader {String} Authorization 用户授权token
 * @apiBody (query) {String} role 用户角色
 * @apiBody (query) {String} description 对用户角色的描述
 */
router.patch('auth/role', async (ctx) => {
	const { role, description } = ctx.request.body;

	const { modifiedCount } = await Role.updateOne({ role, isDelete: false }, { description });

	modifiedCount === 1
		? toCliect(ctx, `已更新${role}描述`)
		: toCliect(ctx, '角色不存在', STATUS.FAILURE);
});

/**
 * @api {delete} /api/auth/role 移除角色，逻辑删除
 * @apiVersion 1.0.0
 * @apiName removeRole
 * @apiGroup role
 * @apiHeader {String} Authorization 用户授权token
 * @apiBody (query) {String} role 用户角色
 */
router.delete('auth/role', async (ctx) => {
	const { role } = ctx.request.body;

	if (role === DEFAULT_ROLE) return toCliect(ctx, `默认角色“${DEFAULT_ROLE}”不可删除`, STATUS.FORBIDDEN);

	await Role.updateOne({ role, isDelete: false }, { isDelete: true });
	toCliect(ctx, `已移除${role}`);
});

export default router;