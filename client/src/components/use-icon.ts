import { h } from 'vue';
import * as Icons from '@element-plus/icons-vue';

// 创建Icon组件
export const useIcon = (props: { color: string, icon: string, size: number }) => {
	const { icon, size, color } = props;
	return h(
		Icons[icon as keyof typeof Icons],
		{
			class: 'el-icon',
			style: {
				color,
				fontSize: `${size}px`
			}
		}
	);
};

export const iconNameArr = Object.keys(Icons);
