// logger.info('logger 文件在 shared 项目中');
// logger.trace('global STATUS SUCCESS', STATUS.SUCCESS);
import { useRouter } from '@/util';

const router = useRouter();

router.get('test', (ctx) => {
	toCliect(ctx, '顺利测试一个！');
});

export default router;