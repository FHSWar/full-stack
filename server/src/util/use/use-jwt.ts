import jwt from 'koa-jwt';
import { sign, verify } from 'jsonwebtoken';
import { secretKey } from '@/config';
import { IRole } from '@/model/role';
import { IUser } from '@/model/user';
import { KoaContext, KoaInstance, KoaNext } from '@/util';

// 自定义对状态码为401的处理，必须return
// eslint-disable-next-line arrow-body-style
const handleUnauthorized = async (ctx: KoaContext, next: KoaNext) => {
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

export const useJWT = (app: KoaInstance) => {
	app.use(handleUnauthorized);
	// 接入jwt
	app.use(jwt({ secret: secretKey }).unless({
		path: [
			/auth\/login/,
			/auth\/register/,
			/log/
		]
	}));
};

export const generateToken = (payload: {
	username: IUser['username']
	um: IUser['um']
	roles: IRole['role'][]
	timeStamp: Date
}) => sign(payload, secretKey, { expiresIn: '7d' });

// 能进到业务代码的都不要开发人员处理错误，koa-jwt帮我们处理了
// 这个catch是处理中间件解析token因错误token报错的问题
export const verifyToken = (payload: string) => {
	try {
		return {
			suc: true,
			token: verify(payload, secretKey),
			err: ''
		};
	} catch (e) {
		return {
			suc: false,
			token: '',
			err: (e as Error).toString()
		};
	}
};