import Router from '@koa/router';

export const useRouter = (prefix: string = '/api/') => new Router({ prefix });