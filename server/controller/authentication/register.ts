import { useRouter } from '@util';
import { User } from 'model/user';
import { Role } from 'model/role';

const umRegex = /^[a-zA-Z][a-zA-Z0-9-]*[0-9]$/;
const router = useRouter();

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

	const defaultRole = await Role.findOne({ role: 'visitor', isDelete: false });
	const doc = new User({ username, password, um: umNo, permission: [defaultRole?._id] });

	await doc.save();

	toCliect(ctx, '注册成功');
});

export default router;