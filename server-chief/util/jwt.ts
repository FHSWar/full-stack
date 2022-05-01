import Koa from 'koa';
import jwt from 'koa-jwt';
import { sign, verify } from 'jsonwebtoken';
import { secretKey } from 'config';

// 自定义对状态码为401的处理，必须return
// eslint-disable-next-line arrow-body-style
const handleUnauthorized = async (ctx:Koa.Context, next:Koa.Next) => {
	try {
		return await next();
	} catch (err:any) {
		if (err.status === 401) {
			toCliect(
				ctx,
				err.originalError ? err.originalError.message : err.message,
				STATUS.UNAUTHORIZED
			);
		} else {
			throw err;
		}
	}
};

export const useJWT = (app:Koa) => {
	app.use(handleUnauthorized);
	// 接入jwt
	app.use(jwt({ secret: secretKey }).unless({
		path: [
			/auth\/login/,
			/auth\/register/
		]
	}));
};

export const generateToken = (payload:any = {}) => sign(payload, secretKey, { expiresIn: '7d' });
export const verifyToken = (payload:any = {}) => verify(payload, secretKey);