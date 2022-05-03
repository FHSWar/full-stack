<script lang="ts" setup>
import menuTree from './menu-tree.vue';
import type { MenuList, MenuTree } from '@/types';
import { test } from '@/api/authorization';

const testToken = async () => {
	const res = await test({ a: 1, b: 2, c: 3 });
	console.log('testToken', res);
};

const sideMenuList = [
	{
		title: '流程',
		id: '1',
		pid: '',
		icon: 'Message',
		page: 'one'
	},
	{
		title: '流程2',
		id: '4',
		icon: 'Setting',
		page: 'two',
		pid: '3'
	},
	{
		title: '流程3',
		icon: 'ColdDrink',
		id: '3',
		pid: '2'
	},
	{
		title: '流程1',
		id: '2',
		pid: '',
		icon: 'Coffee'
	}
];
const assembleTree = (data:MenuList) => {
	const map:any = {};
	data.forEach((item) => {
		map[item.id] = item;
		item!.children = [];
	});

	const roots:MenuTree = [];
	data.forEach((item) => {
		const parent = map[item!.pid];
		if (parent) {
			parent.children.push(item);
		} else {
			roots.push(item as MenuTree[number]);
		}
	});
	return roots;
};
const sideMenu = assembleTree(sideMenuList as MenuList);

</script>

<template>
  <el-scrollbar class="aside__wrapper">
    <!-- 一个侧边菜单只应有一个el-menu作为根，不应该被递归到 -->
    <el-menu class="aside__container" :default-openeds="[]">
      <el-header style="background-color: #409EFF;">
        一个顶栏
      </el-header>
      <menu-tree :aside-menu-tree="sideMenu" :aside-menu-list="(sideMenuList as MenuList)" />
      <el-button type="primary" @click="testToken">
        测试token
      </el-button>
    </el-menu>
  </el-scrollbar>
</template>
