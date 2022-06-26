import { join } from 'path';
import dayjs from 'dayjs';
import { createLogger, format, transports } from 'winston';

const { colorize, combine, json, simple, timestamp } = format;

const LEVEL = Symbol.for('level');

const fileConfigFactory = (logPath: string, level: string) => ({
	level,
	filename: join(logPath, `${level}.log`),
	// 只返回对应级别的打印（这里不combine不按顺序写的话时间戳不会写到文件里）
	format: combine(
		timestamp(),
		format((info: any) => {
			if (info[LEVEL] === level) {
				// 不想defaultMeta污染打印，可以在info这里挂在额外的属性
				// info.service = 'server';
				return info;
			}
		})(level),
		json()
	)
});

export const useLogger = (targetFolder: string) => {
	const date = dayjs().format('YYYY-MM-DD');
	const logPath = join(targetFolder, date);

	const logger = createLogger({
		// defaultMeta: { service: 'server' },
		level: 'silly',
		transports: [
			new transports.File(fileConfigFactory(logPath, 'info')),
			new transports.File(fileConfigFactory(logPath, 'debug')),
			new transports.File(fileConfigFactory(logPath, 'warn')),
			new transports.File(fileConfigFactory(logPath, 'error')),

			// 这样颜色就只会输出到控制台，时间戳只会输出到文件，互不污染
			new transports.Console({ format: combine(colorize(), simple()) })
		]
	});
	return logger;
};
