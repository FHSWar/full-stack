import User from 'model/user';

router.post('auth/login', async (ctx, next) => {
	const { username, password } = ctx.request.body;

	const passwordCorrect = await User.findOne({ username, password });
	if (passwordCorrect) {
		toCliect(ctx, '账号密码正确');
		return;
	}

	console.log('username, password', username, password);
	const userExist = await User.findOne({ username });
	console.log('userExist', userExist);
	if (userExist) {
		toCliect(ctx, '密码不正确', STATUS.FORBIDDEN);
		return;
	}

	toCliect(ctx, '用户不存在', STATUS.FAILURE);

	next();
});

export default router;