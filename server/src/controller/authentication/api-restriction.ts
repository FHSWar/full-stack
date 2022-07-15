import { ApiRestriction, IApiRestriction } from '@/model/api-restriction';
import { findRoleDocArr } from '@/util';

const router = useRouter();

router.get('auth/api-restriction', async (ctx) => {
	const apiList = await ApiRestriction.find({ isDelete: false }).populate('roles').lean();

	const list = apiList.map((item) => {
		const { apiRoute, belongModule, description, requestMethod, roles, updatedAt } = item;
		const roleStrArr = roles.map(({ role }) => role);

		return { apiRoute, belongModule, description, updatedAt, requestMethod, roles: roleStrArr };
	});

	toCliect(ctx, { list });
});

router.get('auth/api-restriction-modules', async (ctx) => {
	const modules = await ApiRestriction.find({ isDelete: false }).distinct('belongModule').lean();

	toCliect(ctx, { list: modules });
});

router.post('auth/api-restriction', async (ctx) => {
	const { body } = ctx.request;
	const { apiRoute, belongModule, description, requestMethod, roles } = body;

	try {
		const roleDocArr = await findRoleDocArr(roles as string[]);

		await new ApiRestriction({
			apiRoute,
			belongModule,
			description,
			requestMethod,
			roles: roleDocArr.map((doc) => doc._id)
		}).save();
	} catch (e) {
		return toCliect(ctx, (e as Error).toString(), STATUS.FORBIDDEN);
	}

	toCliect(ctx, '已新增接口限制');
});

router.patch('auth/api-restriction', async (ctx) => {
	const { body } = ctx.request;
	const { apiRoute, belongModule, description, requestMethod, roles } = body;

	try {
		const roleDocArr = await findRoleDocArr(roles as string[]);

		// 只能给用户更新所属模块，描述和有权角色
		await ApiRestriction.updateOne(
			{ apiRoute, requestMethod, isDelete: false },
			{
				belongModule,
				description,
				roles: roleDocArr.map((doc) => doc._id)
			}
		);
	} catch (e) {
		return toCliect(ctx, (e as Error).toString(), STATUS.FORBIDDEN);
	}

	toCliect(ctx, {
		body,
		message: '已修改'
	});
});

router.delete('auth/api-restriction', async (ctx) => {
	const { body } = ctx.request as { body: IApiRestriction };
	const { apiRoute } = body;

	// 逻辑删除真是挺麻烦
	await ApiRestriction.updateOne(
		{ apiRoute, isDelete: false },
		{ isDelete: true }
	);

	toCliect(ctx, '已移除对应接口限制');
});

export default router;