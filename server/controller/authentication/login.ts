import { defaultRole } from 'config';
import { Role } from 'model/role';
import { User } from 'model/user';
import { encryptBySHA512, decryptPassword, generateToken, useRouter } from '@util';

const router = useRouter();

router.post('auth/login', async (ctx) => {
	const { username, password } = ctx.request.body;

	const passwordCorrect = await User.findOne({
		username,
		password: encryptBySHA512(decryptPassword(password)),
		isDelete: false
	}).populate('roles');

	if (passwordCorrect) {
		const roleArr = passwordCorrect.roles
			.filter((v) => v.isDelete === false)
			.map((v) => v.role);

		// 用户角色都删除了就回退到默认角色
		if (roleArr.length === 0) {
			const defaultRoleDoc = await Role.findOne({ role: defaultRole, isDelete: false });
			await User.updateOne({ username, isDelete: false }, { roles: [defaultRoleDoc!._id] });
		}

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

	const userExist = await User.findOne({ username, isDelete: false });
	if (userExist) return toCliect(ctx, '密码不正确', STATUS.FORBIDDEN);

	toCliect(ctx, '用户不存在', STATUS.FAILURE);
});

export default router;