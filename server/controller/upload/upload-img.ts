import { createWriteStream, readdirSync, unlinkSync } from 'fs';
import multer from '@koa/multer';
import { IUser, User } from 'model/user';
import {
	staticDir,
	upload,
	verifyToken
} from '@util';

// process.cwd(): /Users/fhs_war/Documents/trainHall/full-stack/server
// __dirname: /Users/fhs_war/Documents/trainHall/full-stack/server/router/upload

const router = useRouter();

router.post('upload/avatar', upload, async (ctx) => {
	const { avatar } = ctx.request.files as { avatar: multer.File[] };
	const { authorization: token } = ctx.request.header;
	const { um, username } = verifyToken((token as string).replace('Bearer ', '')) as Omit<IUser, 'password'>;

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