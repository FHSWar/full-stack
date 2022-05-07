import { User } from 'model/user';

router.post('auth/register', async (ctx, next) => {
	const { username, password, checkPassword } = ctx.request.body;
	if (!username) {
		toCliect(ctx, '无效提交', STATUS.FAILURE);
		return;
	}

	const user = await User.findOne({ username });

	if (user) {
		toCliect(ctx, '该名称已被使用', STATUS.FORBIDDEN);
		return;
	}

	if (password !== checkPassword) {
		toCliect(ctx, '无效提交', STATUS.FAILURE);
		return;
	}

	await new User({ username, password }).save();

	toCliect(ctx, '注册成功');
	next();
});

export default router;