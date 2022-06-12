import { DEFAULT_ROLE } from 'shared';
import { Role } from '@/model/role';
import { User } from '@/model/user';
import { encryptBySHA512, decryptPassword, generateToken } from '@/util';

const router = useRouter();

const checkDefaultRole = async () => {
	const roleDocArr = await Role.find({ isDelete: false });
	if (roleDocArr.length === 0) {
		await new Role({
			role: DEFAULT_ROLE,
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

		// 已有角色都被删除了，就退回默认角色
		if (roleArr.length === 0) {
			const defaultRoleDoc = await Role.findOne({ role: DEFAULT_ROLE });
			await passwordCorrect.updateOne({ roles: [defaultRoleDoc?._id] });
		}

		const bareToken = generateToken({
			username,
			um: passwordCorrect.um,
			roles: roleArr,
			timeStamp: new Date()
		});

		toCliect(ctx, {
			token: `Bearer ${bareToken}`,
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
	const token = header.authorization;

	// redis里存token黑名单，中间件做校验
	if (token) await redis.set(token, 1);

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

	await checkDefaultRole();

	const defaultRoleDoc = await Role.findOne({ role: DEFAULT_ROLE });

	try {
		const doc = new User({
			username,
			um: umNo.toUpperCase(),
			password: encryptBySHA512(decryptPassword(password)),
			roles: [defaultRoleDoc?._id]
		});

		await doc.save();

		return toCliect(ctx, '注册成功');
	} catch (e) {
		toCliect(ctx, (e as Error).toString(), STATUS.FORBIDDEN);
	}
});

export default router;