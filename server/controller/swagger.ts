import { writeFileSync } from 'fs';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
	info: {
		title: 'API',
		version: '1.0.0',
		description: 'API'
	},
	host: 'localhost:9000',
	basePath: '/api/' // Base path (optional)
};
const options = {
	swaggerDefinition,
	apis: [
		'/Users/fhs_war/my-github/full-stack/server/controller/authentication/*.ts',
		'/Users/fhs_war/my-github/full-stack/server/controller/upload/*.ts',
		'/Users/fhs_war/my-github/full-stack/server/model/*.ts'
	] // 写有注解的router的存放地址
};
const swaggerSpec = swaggerJSDoc(options);

writeFileSync('public/static/swagger.json', JSON.stringify(swaggerSpec, null, 4));

const router = useRouter();

// https://www.twblogs.net/a/5eeb6c684b16c91a2848f689
// 通过路由获取生成的注解文件
router.get('swagger', async (ctx) => {
	toCliect(ctx, { swaggerSpec });
});

export default router;