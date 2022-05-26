import { User } from 'model/user';
import { encryptBySHA512, decryptPassword, generateToken, useRouter } from '@util';

const router = useRouter();

router.post('auth/login', async (ctx) => {
	const { username, password } = ctx.request.body;

	const passwordCorrect = await User.findOne({
		username,
		password: encryptBySHA512(decryptPassword(password))
	}).populate('roles');

	if (passwordCorrect) {
		const roleArr = passwordCorrect.roles
			.filter((v) => v.isDelete === false)
			.map((v) => v.role);

		toCliect(ctx, {
			token: generateToken({
				username,
				um: passwordCorrect.um,
				roles: roleArr
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