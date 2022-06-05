import { IUser, User } from 'model/user';
import { generateToken, verifyToken } from '@util';

const router = useRouter();

/**
 * @api {get} /api/auth/userInfo 获取登录人信息
 * @apiVersion 1.0.0
 * @apiName userInfo
 * @apiGroup user
 * @apiHeader {String} Authorization 用户授权token
 */
router.get('auth/userInfo', async (ctx) => {
	const { header } = ctx;
	const { um, username } = verifyToken(header.authorization?.replace('Bearer ', '') as string) as IUser;
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
 * @apiGroup role
 * @apiHeader {String} Authorization 用户授权token
 * @apiBody (query) {String} username 用户名
 * @apiBody (query) {String} [oldPassword] 旧密码
 * @apiBody (query) {String} [password] 新密码
 */
// todo:加密之后，这个更改密码的逻辑也得改
router.post('auth/updateSelfInfo', async (ctx) => {
	const {
		um,
		username,
		oldPassword,
		password
	} = ctx.request.body;
	const userInfo = await User.findOne({ um }).populate('roles');

	if (userInfo) {
		userInfo.username = username;
		if (oldPassword) {
			userInfo.password = password;
			await User.updateOne({ um, password: oldPassword }, userInfo);
		} else {
			await User.updateOne({ um }, userInfo);
		}

		toCliect(ctx, {
			token: generateToken({
				username,
				um: userInfo.um,
				roles: userInfo.roles.map(({ role }) => role),
				timeStamp: new Date()
			}),
			message: '用户信息已更新'
		});
	}
});

export default router;