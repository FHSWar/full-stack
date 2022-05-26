import { IUser, User } from 'model/user';
import { useRouter, generateToken, verifyToken } from '@util';

const router = useRouter();

router.get('auth/userInfo', async (ctx) => {
	const { header } = ctx;
	const { um, username } = verifyToken(header.authorization?.replace('Bearer ', '')) as IUser;
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

// 用户自己只能改名字和头像
router.post('auth/updateSelfInfo', async (ctx) => {
	const {
		um,
		username,
		oldPassword,
		password
	} = ctx.request.body;
	const userInfo = await User.findOne({ um });

	if (userInfo) {
		userInfo.username = username;
		userInfo.updateTime = new Date();
		if (oldPassword) {
			userInfo.password = password;
			await User.updateOne({ um, password: oldPassword }, userInfo);
		} else {
			await User.updateOne({ um }, userInfo);
		}

		toCliect(ctx, {
			token: generateToken({ username, um: userInfo.um }),
			message: '用户信息已更新'
		});
	}
});

export default router;