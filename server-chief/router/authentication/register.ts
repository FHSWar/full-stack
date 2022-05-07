import { User } from 'model/user';

const umRegex = /^[a-zA-Z][a-zA-Z0-9-]*[0-9]$/;

router.post('auth/register', async (ctx, next) => {
	const {
		username, umNo, password, checkPassword
	} = ctx.request.body;
	if (!username) {
		toCliect(ctx, '无效提交', STATUS.FAILURE);
		return;
	}

	const user = await User.findOne({ $or: [{ username }, { um: umNo }] });

	if (user) {
		toCliect(ctx, '用户名或工号已被使用', STATUS.FORBIDDEN);
		return;
	}

	if (password !== checkPassword || !umRegex.test(umNo)) {
		toCliect(ctx, '无效提交', STATUS.FAILURE);
		return;
	}

	await new User({ username, password, um: umNo }).save();

	toCliect(ctx, '注册成功');
	next();
});

export default router;