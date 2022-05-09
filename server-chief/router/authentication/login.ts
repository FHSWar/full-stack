import { User } from 'model/user';
import { generateToken } from 'util/jwt';

router.post('auth/login', async (ctx) => {
	const { username, password } = ctx.request.body;
	const passwordCorrect = await User.findOne({ username, password });
	if (passwordCorrect) {
		toCliect(ctx, {
			token: generateToken({ username, um: passwordCorrect.um }),
			message: '已登陆'
		});
		return;
	}

	const userExist = await User.findOne({ username });
	if (userExist) {
		toCliect(ctx, '密码不正确', STATUS.FORBIDDEN);
		return;
	}

	toCliect(ctx, '用户不存在', STATUS.FAILURE);
});

export default router;