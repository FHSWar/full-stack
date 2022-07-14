import { ApiPermission } from '@/model/api-restriction';
import { Role } from '@/model/role';

const router = useRouter();

router.get('auth/api-restriction', async (ctx) => {
	const apiList = await ApiPermission.find({ isDelete: false }).populate('roles').lean();

	const list = apiList.map((item) => {
		const { apiRoute, belongModule, description, roles, updatedAt } = item;
		const roleStrArr = roles.map(({ role }) => role);
		return { apiRoute, belongModule, description, updatedAt, roles: roleStrArr };
	});

	toCliect(ctx, { list });
});

router.post('auth/api-restriction', async (ctx) => {
	const { body } = ctx.request;
	const { apiRoute, belongModule, description, roles } = body;

	try {
		const roleArr = (roles as string[]).map((role) => ({ role }));
		const roleDocArr = await Role.find({ $or: roleArr, isDelete: false });
		await new ApiPermission({
			apiRoute,
			belongModule,
			description,
			roles: roleDocArr.map((doc) => doc._id)
		}).save();
	} catch (e) {
		return toCliect(ctx, (e as Error).toString(), STATUS.FORBIDDEN);
	}

	toCliect(ctx, '好好好');
});

export default router;