import { User } from 'model/user';
import { useRouter } from '@util';

const router = useRouter();

router.get('auth/userList', async (ctx) => {
	const userList = await User.find({ isDelete: false }).populate('roles');

	const list = userList.map((u) => {
		const { username, um, roles, createTime, updateTime } = u;
		return {
			username,
			um,
			createTime,
			updateTime,
			roles: roles.filter((v) => !v.isDelete).map((w) => w.role)
		};
	});

	toCliect(ctx, { list });
});

export default router;