import { defaultRole } from 'config';
import { Role } from 'model/role';
import { User } from 'model/user';
import { encryptBySHA512, decryptPassword, generateToken } from '@util';

const router = useRouter();
const umRegex = /^[a-zA-Z][a-zA-Z0-9-]*[0-9]$/;

const checkDefaultRole = async () => {
	const roleDocArr = await Role.find();
	if (roleDocArr.length === 0) {
		await new Role({
			role: defaultRole,
			description: '初始默认角色'
		}).save();
	}
};

/**
 * @api {post} /api/auth/login 登陆
 * @apiVersion 1.0.0
 * @apiName login
 * @apiGroup register-login-logout
 * @apiBody (query) {String} username 用户名
 * @apiBody (query) {String} password 非对称加密后的密码
 */
router.post('auth/login', async (ctx) => {
	const { username, password } = ctx.request.body;

	const passwordCorrect = await User.findOne({
		username,
		password: encryptBySHA512(decryptPassword(password)),
		isDelete: false
	}).populate('roles');

	if (passwordCorrect) {
		const roleArr = passwordCorrect.roles
			.filter((v) => v.isDelete === false)
			.map((v) => v.role);

		// 用户角色都删除了就回退到默认角色
		if (roleArr.length === 0) {
			const defaultRoleDoc = await Role.findOne({ role: defaultRole, isDelete: false });
			await User.updateOne({ username, isDelete: false }, { roles: [defaultRoleDoc!._id] });
		}

		toCliect(ctx, {
			token: generateToken({
				username,
				um: passwordCorrect.um,
				roles: roleArr,
				timeStamp: new Date()
			}),
			message: '已登陆'
		});
		return;
	}

	const userExist = await User.findOne({ username, isDelete: false });
	if (userExist) return toCliect(ctx, '密码不正确', STATUS.FORBIDDEN);

	toCliect(ctx, '用户不存在', STATUS.FAILURE);
});

/**
 * @api {post} /api/auth/logout 退出
 * @apiVersion 1.0.0
 * @apiName logout
 * @apiGroup register-login-logout
 * @apiHeader {String} Authorization 用户授权token
 */
router.post('auth/logout', async (ctx) => {
	const { header } = ctx.request;
	const token = header.authorization || '';

	// redis里存token黑名单，中间件做校验
	await redis.set(token, 1);

	toCliect(ctx, '已退出');
});

/**
 * @api {post} /api/auth/register 注册
 * @apiVersion 1.0.0
 * @apiName register
 * @apiGroup register-login-logout
 * @apiBody (query) {String} umNo 用户工号
 * @apiBody (query) {String} username 用户名
 * @apiBody (query) {String} password 非对称加密后的密码
 */
router.post('auth/register', async (ctx) => {
	const { username, umNo, password } = ctx.request.body;

	if (!username) {
		toCliect(ctx, '无效提交', STATUS.FAILURE);
		return;
	}

	const user = await User.findOne({
		$and: [
			{ $or: [{ username }, { um: umNo }] },
			{ isDelete: false }
		]
	});

	if (user) {
		toCliect(ctx, '用户名或工号已被使用', STATUS.FORBIDDEN);
		return;
	}

	if (!umRegex.test(umNo)) {
		toCliect(ctx, '无效提交', STATUS.FAILURE);
		return;
	}

	await checkDefaultRole();

	const defaultRoleDoc = await Role.findOne({ role: defaultRole, isDelete: false });
	const doc = new User({
		username,
		um: umNo,
		password: encryptBySHA512(decryptPassword(password)),
		roles: [defaultRoleDoc?._id]
	});

	await doc.save();

	toCliect(ctx, '注册成功');
});

export default router;