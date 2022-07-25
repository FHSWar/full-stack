/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import type {
	Logger,
	KoaContext,
	KoaRouter,
	RedisType,
	ScheduleJob,
	SequelizeInstance,
	Status,
	WebSocketServer
} from '@/util';

declare global {
    var token: string; // 单测登陆态不知道放哪儿，只好丢到全局了
    var logger: Logger; // 全局日志打印，根据日期分文件夹，根据类型分文件
    var redis: RedisType; // redis实例
    var scheduler: { // 单测结束需要cancel掉定时器
        [key: string]: ScheduleJob | undefined
    };
    var sequelize: Sequelize;
    var STATUS: Status; // 状态码
    var toCliect: ( // 返回给前端的格式统一封装
        ctx: KoaContext,
        content: {
            message?: string
            [key: string]: any
        } | string,
        status?: Status[keyof Status]
    ) => void;
    var useRouter: (prefix?: string) => KoaRouter; // 返回koa-router实例
    var wss: WebSocketServer; // websocket实例
}

export { };