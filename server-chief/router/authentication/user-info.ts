import { IUser, User } from 'model/user';
import { verifyToken } from '@util';

router.get('auth/userInfo', async (ctx, next) => {
	const { header } = ctx;
	const { username, password } = verifyToken(header.authorization?.replace('Bearer ', '')) as IUser;
	const userInfo = await User.findOne({ username, password });
	if (userInfo) {
		toCliect(ctx, {
			editable: ['username'],
			userInfo: {
				username: userInfo.username,
				permission: userInfo?.permission
			}
		});
	}

	next();
});

// 用户自己只能改名字和头像
router.post('auth/updateSelfInfo', async (ctx, next) => {
	console.log('auth/updateSelfInfo', ctx.request.body);
	toCliect(ctx, 'okok');
	next();
});