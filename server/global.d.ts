/* eslint-disable */
import {
    Logger,
    KoaInstance,
    KoaContext,
    KoaRouter,
    Status,
    WebSocketServer
} from '@util'

declare global {
    var logger: Logger
    var router: KoaRouter
    var STATUS: Status
    var toCliect: (
        ctx: KoaContext,
        content: {
            message?: string
            [key: string]: any
        } | string,
        status?: Status[keyof Status]
    ) => void
    var wss: WebSocketServer
}

export { }