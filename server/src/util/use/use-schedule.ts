import { scheduleJob } from 'node-schedule';
import { useLogger } from 'shared';
import { isTest, logTarget } from '@/config';

export const useSchedule = () => {
	// 每天更新文件输出的目标文件夹
	const upateLogger = () => {
		scheduleJob('0 0 * * *', () => {
			global.logger = useLogger(logTarget);
			logger.info('rotate file daily');
		});
	};

	if (!isTest) upateLogger();
};