import { defaultRole } from 'config';
import { decryptPassword, encryptBySHA512, useRouter } from '@util';
import { User } from 'model/user';
import { Role } from 'model/role';

const umRegex = /^[a-zA-Z][a-zA-Z0-9-]*[0-9]$/;
const router = useRouter();

const checkDefaultRole = async () => {
	const roleDocArr = await Role.find();
	if (roleDocArr.length === 0) {
		await new Role({
			role: defaultRole,
			description: '初始默认角色'
		}).save();
	}
};

router.post('auth/register', async (ctx) => {
	const { username, umNo, password } = ctx.request.body;

	if (!username) {
		toCliect(ctx, '无效提交', STATUS.FAILURE);
		return;
	}

	const user = await User.findOne({ $or: [{ username }, { um: umNo }] });

	if (user) {
		toCliect(ctx, '用户名或工号已被使用', STATUS.FORBIDDEN);
		return;
	}

	if (!umRegex.test(umNo)) {
		toCliect(ctx, '无效提交', STATUS.FAILURE);
		return;
	}

	await checkDefaultRole();

	const defaultRoleDoc = await Role.findOne({ role: defaultRole, isDelete: false });
	const doc = new User({
		username,
		um: umNo,
		password: encryptBySHA512(decryptPassword(password)),
		roles: [defaultRoleDoc?._id]
	});

	await doc.save();

	toCliect(ctx, '注册成功');
});

export default router;