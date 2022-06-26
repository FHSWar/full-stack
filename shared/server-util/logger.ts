import { join } from 'path';
import dayjs from 'dayjs';
import { createLogger, format, transports } from 'winston';

const { colorize, combine, json, label, simple, timestamp } = format;

const LEVEL = Symbol.for('level');

const fileConfigFactory = (logPath: string, level: string) => ({
	level,
	filename: join(logPath, `${level}.log`),
	// 只返回对应级别的打印（这里不combine一下json()时间戳不会写到文件里）
	format: combine(
		json(),
		label({ label: __dirname }),
		format((info: any) => {
			if (info[LEVEL] === level) {
				return info;
			}
		})(level)
	)
});

export const useLogger = (targetFolder: string) => {
	const date = dayjs().format('YYYY-MM-DD');
	const logPath = join(targetFolder, date);

	const logger = createLogger({
		// defaultMeta: { service: 'server' },
		level: 'silly',
		format: combine(json(), timestamp()),
		transports: [
			new transports.File(fileConfigFactory(logPath, 'info')),
			new transports.File(fileConfigFactory(logPath, 'debug')),
			new transports.File(fileConfigFactory(logPath, 'warn')),
			new transports.File(fileConfigFactory(logPath, 'error')),
			// 这样颜色就只会输出到控制台，不会污染写入文件的日志
			new transports.Console({ format: combine(colorize(), simple()) })
		]
	});

	// logger.add()可以追加transports

	return logger;
};
