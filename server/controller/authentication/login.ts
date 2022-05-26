import { User } from 'model/user';
import { decryptPassword, generateToken, useRouter } from '@util';

const router = useRouter();

router.post('auth/login', async (ctx) => {
	const { username, password } = ctx.request.body;

	const decrypted = decryptPassword(password);

	const passwordCorrect = await User.findOne({ username, password: decrypted }).populate('permission');

	if (passwordCorrect) {
		const roleArr = passwordCorrect.permission
			.filter((v) => v.isDelete === false)
			.map((v) => v.role);

		toCliect(ctx, {
			token: generateToken({
				username,
				um: passwordCorrect.um,
				permission: roleArr
			}),
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