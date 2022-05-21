import { ThemeConfig, UserInfo } from '@/utils';
import { getLocal, setLocal } from './commucate-local-storage';

let temp:any;

let themeConfig: ThemeConfig;
themeConfig = getLocal('themeConfig') as ThemeConfig;
if (themeConfig === null) {
	themeConfig = { isAsideMenuCollapse: false };
	setLocal('themeConfig', themeConfig);
}

let userInfo: UserInfo;
temp = getLocal('userInfo') as UserInfo;
if (temp !== null) userInfo = temp;
else userInfo = {} as UserInfo;

let token:string;
temp = getLocal('token') as string;
if (temp !== null) token = temp;
else token = '';

export default { themeConfig, token, userInfo };
