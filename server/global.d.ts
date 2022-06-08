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
    var logger: Logger
    var redis: RedisType
    var STATUS: Status
    var toCliect: (
        ctx: KoaContext,
        content: {
            message?: string
            [key: string]: any
        } | string,
        status?: Status[keyof Status]
    ) => void
    var useRouter: (prefix?: string) => KoaRouter
    var wss: WebSocketServer
}

export { }