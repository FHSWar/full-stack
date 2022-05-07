import { IUser, User } from 'model/user';
import { generateToken, verifyToken } from '@util';

router.get('auth/userInfo', async (ctx, next) => {
	const { header } = ctx;
	const { um, username, password } = verifyToken(header.authorization?.replace('Bearer ', '')) as IUser;
	const userInfo = await User.findOne({ username, password });
	if (userInfo) {
		toCliect(ctx, {
			editable: ['username'],
			userInfo: {
				username: userInfo.username,
				um,
				permission: userInfo?.permission
			}
		});
	}

	next();
});

// 用户自己只能改名字和头像
router.post('auth/updateSelfInfo', async (ctx, next) => {
	const {
		um,
		username,
		oldPassword,
		password
	} = ctx.request.body;

	const userInfo = await User.findOne({ um });

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
				password: userInfo.password
			}),
			message: '用户信息已更新'
		});
	}

	next();
});