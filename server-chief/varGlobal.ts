/* eslint-disable */
import {STATUS} from 'shared'

type STATUS_TYPE = typeof STATUS

declare global {
    var STATUS: STATUS_TYPE;
}
global.STATUS = STATUS;

export { };
