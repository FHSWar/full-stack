import { createWriteStream, readdirSync, unlinkSync } from 'fs';
import multer from '@koa/multer';
import { IUser, User } from '@/model/user';
import { staticDir, upload, verifyToken } from '@/util';

const router = useRouter();

/**
 * @api {post} /api/upload/avatar 更换登录人头像
 * @apiVersion 1.0.0
 * @apiName avatar
 * @apiGroup user
 * @apiHeader {String} Authorization 用户授权token
 * @apiBody (query) {Object[]} avatar 用户头像
 */
router.post('upload/avatar', upload, async (ctx) => {
	const files = ctx.request.files as { avatar: multer.File[] };

	if (!files) return toCliect(ctx, '图片不能为空', STATUS.FORBIDDEN);

	const avatar = files.avatar;

	const { authorization } = ctx.request.header;

	// 不以/api/auth打头的，自定义中间件未做处理，这里业务代码就要自己处理个
	const { token } = verifyToken((authorization as string).replace('Bearer ', ''));
	const { um, username } = token as Omit<IUser, 'password'>;

	// 头像不能大于1M
	if (avatar[0].size / 1024 / 1024 > 1) {
		toCliect(ctx, '图片体积过大', STATUS.OVERTIME);
		return;
	}

	// 一个工号一个头像
	const fileName = `${um}_${Date.now()}.${avatar[0].originalname.split('.').at(-1)}`;
	const userInfo = await User.findOne({ um, username });
	if (userInfo) {
		userInfo.avatar = `avatar/${fileName}`;
		await User.updateOne({ um, username }, userInfo);
	}

	// 同一个用户上传了新的，就先把旧的删掉，非常合理
	const avatarDir = `${staticDir}/avatar`;
	readdirSync(avatarDir)
		.filter((filename) => filename.startsWith(um))
		.forEach((filename) => unlinkSync(`${avatarDir}/${filename}`));

	createWriteStream(`${avatarDir}/${fileName}`).write(avatar[0].buffer);

	toCliect(ctx, '图片已上传');
});

export default router;