import { join } from 'path';
import log4js from 'log4js';

// ⚠️注意：只能将文件放在server项目的二机目录中，log才会写到monorepo的根目录，虽然有限制，但这样更简洁，也能完成需求，改造也简单
// 返回统一配置的 logger 对象
export const useLogger = (prefix: string, root: string) => {
	const getFilename = () => join(
		root,
		'../../log',
		root.split('/').at(-2) as string,
		'logger'
	);
	log4js.configure({
		appenders: {
			console: {
				type: 'stdout' // 控制台输出
			},
			file: {
				type: 'file',
				filename: getFilename(), // 要打入到文件的位置
				pattern: 'yyyy-MM-dd.log', // 使用正则将日志分按天或者月分为不同文件
				alwaysIncludePattern: true // 当为 true 时，log 文件名会包含之前设置的 pattern 信息 (默认为 false，但是强烈建议开启)
			}
		},
		categories: {
			default: {
				appenders: ['console', 'file'],
				// 通过环境变量设置不同的日志级别
				level: 'all'// process.env.NODE_ENV === 'development' ? 'all' : 'info'
			}
		}
	});

	return log4js.getLogger(prefix);
};