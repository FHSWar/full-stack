import Router from '@koa/router';
import { Schema } from 'mongoose';
import { STATUS, useLogger } from 'shared';
import wss from './web-socket';

const router = new Router();

global.logger = useLogger('chief', __dirname);
global.router = router;
global.Schema = Schema;
global.STATUS = STATUS;
global.wss = wss;

console.log('mount-global worked');