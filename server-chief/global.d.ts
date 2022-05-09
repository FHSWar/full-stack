/* eslint-disable */
import {
    Logger,
    KoaInstance, 
    KoaContext, 
    KoaRouter,
    ModelType,
    SchemaType,
    Status,
    WebSocketServer
} from '@util'
declare global {
    var logger: Logger
    var model: ModelType
    var router: KoaRouter
    var Schema: SchemaType
    var STATUS: Status
    var toCliect: (ctx: KoaContext, content:any, status?:Status[keyof Status]) => void
    var wss: WebSocketServer
}

export { }