import { User } from 'model/user';
import { useRouter } from '@util';

const router = useRouter();

router.get('auth/userList', async (ctx) => {
	const userList = await User.find({ isDelete: false }).populate('permission');

	const list = userList.map((u) => {
		const { username, um, permission } = u;
		return {
			username,
			um,
			permission: permission.filter((v) => !v.isDelete).map((w) => w.role)
		};
	});

	toCliect(ctx, { list });
});

export default router;