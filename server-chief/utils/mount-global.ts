import { STATUS } from 'shared';
import wss from './web-socket';

global.STATUS = STATUS;
global.wss = wss;