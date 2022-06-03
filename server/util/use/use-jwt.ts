import Koa from 'koa';
import jwt from 'koa-jwt';
import { sign, verify } from 'jsonwebtoken';
import { secretKey } from 'config';
import { IRole } from 'model/role';
import { IUser } from 'model/user';

// 自定义对状态码为401的处理，必须return
// eslint-disable-next-line arrow-body-style
const handleUnauthorized = async (ctx: Koa.Context, next: Koa.Next) => {
	try {
		return await next();
		// ts: Catch clause variable type annotation must be 'any' or 'unknown' if specified.
	} catch (err: any) {
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

export const useJWT = (app: Koa) => {
	app.use(handleUnauthorized);
	// 接入jwt
	app.use(jwt({ secret: secretKey }).unless({
		path: [
			/auth\/login/,
			/auth\/register/
		]
	}));
};

export const generateToken = (payload: {
	username: IUser['username']
	um: IUser['um']
	roles: IRole['role'][]
}) => sign(payload, secretKey, { expiresIn: '7d' });

export const verifyToken = (payload: string) => verify(payload, secretKey);