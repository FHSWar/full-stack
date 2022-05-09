import { staticDir, upload, verifyToken } from '@util';
import { createWriteStream } from 'fs';
import { IUser, User } from 'model/user';

// process.cwd(): /Users/fhs_war/Documents/trainHall/full-stack/server-chief
// __dirname: /Users/fhs_war/Documents/trainHall/full-stack/server-chief/router/upload

router.post('upload/avatar', upload, async (ctx) => {
	const { avatar } = ctx.request.files as any;
	const { authorization: token } = ctx.request.header;
	const { um, username } = verifyToken((token as string).replace('Bearer ', '')) as Omit<IUser, 'password'>;

	// 头像不能大于1M
	if (avatar[0].size / 1024 / 1024 > 1) {
		toCliect(ctx, '图片体积过大', STATUS.OVERTIME);
		return;
	}

	// 一个工号一个头像，非常合理
	const fileName = `${um}.${avatar[0].originalname.split('.').at(-1)}`;
	const userInfo = await User.findOne({ um, username });
	if (userInfo) {
		userInfo.avatar = `avatar/${fileName}`;
		await User.updateOne({ um, username }, userInfo);
	}

	createWriteStream(`${staticDir}/avatar/${fileName}`).write(avatar[0].buffer);

	toCliect(ctx, '图片已上传');
});