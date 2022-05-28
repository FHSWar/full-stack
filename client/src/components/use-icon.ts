import { h } from 'vue';
import * as Icons from '@element-plus/icons-vue';

// 创建Icon组件
export const useIcon = (props: { icon: string }) => {
	const { icon } = props;
	return h(Icons[icon as keyof typeof Icons], { class: 'el-icon' });
};

export const iconNameArr = Object.keys(Icons);
