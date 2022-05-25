import { User } from 'model/user';
import { useRouter, generateToken } from '@util';
import { rsaPrivateKey } from 'config';

const forge = require('node-forge');

const router = useRouter();

router.post('auth/login', async (ctx) => {
	const { username, password } = ctx.request.body;
	const privateK = forge.pki.privateKeyFromPem(rsaPrivateKey);
	const encrypted = Buffer.from(password, 'base64').toString();
	const decrypted = privateK.decrypt(encrypted, 'RSA-OAEP');

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