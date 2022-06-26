import { scheduleJob } from 'node-schedule';
import { useLogger } from 'shared';
import { logTarget } from '@/config';

global.scheduler = {};

// 每天更新文件输出的目标文件夹
export const upateLogger = () => {
	scheduler.upateLogger = scheduleJob('upateLogger', '0 0 * * *', () => {
		global.logger = useLogger(logTarget);
		// logger.info('rotate file daily');
		console.log('rotate file daily');
	});
};

export const useSchedule = () => {
	upateLogger();
};