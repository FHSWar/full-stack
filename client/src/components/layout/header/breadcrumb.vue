<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { computed, toRaw } from 'vue';
import { useStore } from '@/stores';
import { constantRoutes } from '@/router/constant';
import { MenuTree } from '@/types';

const store = useStore();
/*
  基于动态的本身不会重复的前提写的，即路由元素的name得唯一
*/
const dedup = (constant:MenuTree, dynamic:MenuTree) => {
	const getRepeatedStrArr = (arr: string[]) => {
		const temp = arr.reduce((acc, str) => {
			acc[str] ? acc[str]++ : acc[str] = 1;
			return acc;
		}, {} as {[key:string]: number});
		const tempKeyArr = Object.keys(temp);
		// 向结果推入出现超过一次的name值
		return tempKeyArr.reduce((acc, cur) => {
			if (temp[cur] > 1) acc.push(cur);
			return acc;
		}, [] as string[]);
	};

	// 为了splice，用了any，对不住了
	const combined = [...constant, ...dynamic] as any;
	const pageStrArr = combined
		.map((item: MenuTree[number]) => item.page)
		.filter((item: MenuTree[number]) => item !== undefined) as string[];
	const repeatedPage = getRepeatedStrArr(pageStrArr);
	repeatedPage.forEach((pageStr) => {
		const index = combined.findIndex((item: MenuTree[number]|null) => {
			if (item !== null) return item.page === pageStr;
			return false;
		});
		combined.splice(index, 1, null);
	});
	return combined.filter((item: MenuTree[number]|null) => item !== null) as MenuTree;
};

const breadcrumb = computed(() => dedup(constantRoutes, toRaw(store.breadcrumb)));
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <template v-for="{icon, id, page, title} in breadcrumb" :key="id">
      <el-breadcrumb-item v-if="page" :to="{ name: page }">
        <use-icon v-if="icon" :icon="icon" />
        {{ title }}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-else>
        <use-icon v-if="icon" :icon="icon" />
        {{ title }}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
