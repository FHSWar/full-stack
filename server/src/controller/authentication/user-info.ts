import { IUser, User } from '@/model/user';
import { decryptPassword, encryptBySHA512, generateToken, verifyToken } from '@/util';

const router = useRouter();

/**
 * @api {get} /api/auth/userInfo 获取登录人信息
 * @apiVersion 1.0.0
 * @apiName userInfo
 * @apiGroup user
 * @apiHeader {String} Authorization 用户授权token
 */
router.get('auth/userInfo', async (ctx) => {
	const { authorization } = ctx.header;

	const { suc, token, err } = verifyToken((authorization as string).replace('Bearer ', ''));
	if (suc === false) return toCliect(ctx, err, STATUS.INTERNAL_ERROR);
	const { um, username } = token as Omit<IUser, 'password'>;

	const userInfo = await User.findOne({ um, username }).populate('roles');

	if (userInfo) {
		const roleArr = userInfo.roles
			.filter((v) => v.isDelete === false)
			.map((v) => v.role);

		toCliect(ctx, {
			editable: ['username'],
			userInfo: {
				username: userInfo.username,
				um,
				avatar: userInfo?.avatar,
				roles: roleArr
			}
		});
	}
});

/**
 * @api {post} /api/auth/updateSelfInfo 用户自己只能改名字、密码和头像
 * @apiVersion 1.0.0
 * @apiName updateSelfInfo
 * @apiGroup user
 * @apiHeader {String} Authorization 用户授权token
 * @apiBody (query) {String} username 用户名
 * @apiBody (query) {String} [oldPassword] 旧密码
 * @apiBody (query) {String} [password] 新密码
 */
router.post('auth/updateSelfInfo', async (ctx) => {
	const {
		um,
		username,
		oldPassword,
		password,
		roles
	} = ctx.request.body;
	const userInfo = await User.findOne({ um });

	if (userInfo) {
		userInfo.username = username;

		if (oldPassword) {
			const oldPasswordSHA = encryptBySHA512(decryptPassword(oldPassword));
			const passwordSHA = encryptBySHA512(decryptPassword(password));

			const userExist = await User.exists({
				um,
				password: oldPasswordSHA,
				isDelete: false
			});

			if (userExist) {
				userInfo.password = passwordSHA;
				await User.updateOne({ um, password: oldPasswordSHA }, userInfo);
			} else {
				return toCliect(ctx, '密码错误', STATUS.UNAUTHORIZED);
			}
		} else {
			await User.updateOne({ um }, userInfo);
		}

		toCliect(ctx, {
			token: generateToken({
				roles,
				username,
				um: userInfo.um,
				timeStamp: new Date()
			}),
			message: '用户信息已更新'
		});
	}
});

export default router;