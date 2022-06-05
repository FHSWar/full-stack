import { koaSwagger } from 'koa2-swagger-ui';
import { KoaInstance } from '@util';

export const useSwagger = (app: KoaInstance) => {
	app.use(koaSwagger({
		// routePrefix: '/swagger', // host at /swagger instead of default /docs
		swaggerOptions: {
			url: '/swagger.json' // path to doc json
		}
	}));
};