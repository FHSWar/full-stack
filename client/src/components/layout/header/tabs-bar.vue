<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { TabsPaneContext } from 'element-plus';
import { useStore } from '@/stores';
import { constantRoutes } from '@/router/constant';
import { findMenuListChain } from '@/utils';
import { MenuList } from '@/types';

// 固定的页面不可关闭
const tabClosable = computed(() => {
	const constantTabNameArr = constantRoutes.map(({ page }) => page);
	return (tabName:string) => {
		if (constantTabNameArr.includes(tabName)) return false;
		return true;
	};
});

const store = useStore();
// 访问过的页面
const visitedRoutes = computed(() => {
	const dynamicTabs = store.visitedRoutes.map(({ title, page }) => ({ title, page }));
	return [...constantRoutes, ...dynamicTabs];
});

// 当前访问页面应高亮，prev作为fallback
let prevEditableTab = constantRoutes.at(-1)!.page;
const activeTabName = ref(prevEditableTab);

const maintainActiveTab = (pageName: string|undefined) => {
	const currentPage = pageName;
	if (currentPage) {
		prevEditableTab = currentPage;
		activeTabName.value = currentPage;
		return;
	}
	activeTabName.value = prevEditableTab;
};
// 面包屑应该是active tab对应的祖先路径
const maintainBreadCrumb = (tabName: string|undefined) => {
	const menuItem = store.menuList.find((item) => item.page === tabName) as MenuList[number];
	// store.$reset() 这个menuItem就会拿到undefined
	if (menuItem) store.breadcrumb = findMenuListChain(menuItem.id);
};

watchEffect(() => maintainActiveTab(store.breadcrumb.at(-1)?.page));
watchEffect(() => maintainBreadCrumb(activeTabName.value)); // 菜单栏，面包屑和tab栏要相互维护状态，有点点费劲。

// 点击tab跳转，点击叉号去除对应tab并维护路由跳转
const router = useRouter();
const tabClick = (tab:TabsPaneContext) => {
	// page一定维护字符串
	const tabName = tab.paneName as string;

	maintainBreadCrumb(tabName);
	router.push({ name: tabName });
};
const tabRemove = (tabName:string) => {
	const pageIndexInVisitedRoutes = store.visitedRoutes.findIndex(({ page }) => page === tabName);
	store.visitedRoutes = store.visitedRoutes.filter(({ page }) => page !== tabName);

	let targetPage: string;
	const fallbackPage = constantRoutes[0].page as string;
	targetPage = fallbackPage;

	if (pageIndexInVisitedRoutes >= 1) {
		const targetMenuItem = store.visitedRoutes[pageIndexInVisitedRoutes - 1];
		if (targetMenuItem.page) targetPage = targetMenuItem.page;
	}

	maintainActiveTab(targetPage);
	router.push({ name: targetPage });
};
</script>

<template>
  <el-tabs
    class="tabs-bar__wrapper"
    type="card"
    v-model="activeTabName"
    @tab-click="tabClick"
    @tab-remove="tabRemove"
  >
    <!-- page为空的在路由守卫处就被挡掉了 -->
    <el-tab-pane
      v-for="{page, title} in visitedRoutes"
      :key="page"
      :label="title"
      :name="page"
      :closable="tabClosable(page as string)"
    />
  </el-tabs>
</template>
<style lang="scss" scoped>
.tabs-bar {
    // 这一段改标签页样式的css是从vue-admin-better抄的
    &__wrapper {
        --tab-item-height: 32px;

		:deep(.el-tabs__header) {
			border-bottom: 0;
			.el-tabs__nav {
				border: 0;
			}

			.el-tabs__nav-scroll {
				position: relative;
				top: 6px;
				height: 50px;
			}
			.el-tabs__item {
				position: relative;
				top: 10px;
				height: var(--tab-item-height);
				margin-right: 4px;
				line-height: var(--tab-item-height);
				border: var(--el-border);
				border-radius: var(--el-border-radius-base);
			}
		}
    }
}
</style>
