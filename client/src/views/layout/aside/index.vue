<script lang="ts" setup>
import menuTree from './menu-tree.vue';

const sideMenu = [
	{
		children: [

		],
		title: '流程',
		id: '1',
		icon: 'Message'
	},
	{
		children: [
			{
				children: [
					{
						children: [

						],
						title: '流程4',
						id: '4',
						icon: 'Setting'
					}
				],
				title: '流程2',
				id: '3',
				icon: 'Setting'
			}
		],
		title: '流程1',
		id: '2'
	}
];
</script>

<template>
  <el-scrollbar>
    <!-- el-menu组件不应该被递归到，一个侧边菜单只应有一个el-menu作为根 -->
    <el-menu>
      <menu-tree :side-menu-tree="sideMenu" />
    </el-menu>
  </el-scrollbar>
</template>
<style lang="scss" scoped>
</style>
