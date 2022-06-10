/* eslint-disable */
import {
    Logger,
    KoaInstance,
    KoaContext,
    KoaRouter,
    RedisType,
    Status,
    useRouter,
    WebSocketServer
} from '@/util'

declare global {
    // 单测登陆态不知道放哪儿，只好丢到全局了
    var token: string
    // todo：全局日志打印，应该要根据类型，日期分文件夹
    var logger: Logger
    // redis实例
    var redis: RedisType
    // 状态码
    var STATUS: Status
    // 返回给前端的格式统一封装
    var toCliect: (
        ctx: KoaContext,
        content: {
            message?: string
            [key: string]: any
        } | string,
        status?: Status[keyof Status]
    ) => void
    // 返回koa-router实例
    var useRouter: (prefix?: string) => KoaRouter
    // websocket实例
    var wss: WebSocketServer
}

export { }