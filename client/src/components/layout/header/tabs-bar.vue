<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { TabsPaneContext } from 'element-plus';
import { useStore } from '@/stores';

// 暂时不想复杂了，首页固定够用
const constantTabs = [{ title: '首页', page: 'home' }];

const store = useStore();
const visitedRoutes = computed(() => {
	const dynamicTabs = store.visitedRoutes.map(({ title, page }) => ({ title, page }));
	return [...constantTabs, ...dynamicTabs];
});
const tabClosable = computed(() => {
	const constantTabNameArr = constantTabs.map(({ page }) => page);
	return (tabName:string) => {
		if (constantTabNameArr.includes(tabName)) return false;
		return true;
	};
});

const editableTabsValue = ref('home');
const router = useRouter();
const tabClick = (tab:TabsPaneContext) => {
	// page一定维护字符串
	router.push({ name: tab.paneName as string });
};
const tabRemove = (tabName:string) => {
	const pageIndexInVisitedRoutes = store.visitedRoutes.findIndex(({ page }) => page === tabName);
	store.visitedRoutes = store.visitedRoutes.filter(({ page }) => page !== tabName);

	if (pageIndexInVisitedRoutes >= 1) {
		const targetPage = store.visitedRoutes[pageIndexInVisitedRoutes - 1].page;
		router.push({ name: targetPage });
		editableTabsValue.value = targetPage as string;
		return;
	}

	const fallbackPage = constantTabs.at(-1)!.page;
	router.push({ name: fallbackPage });
	editableTabsValue.value = fallbackPage;
};
</script>

<template>
  <el-tabs
    class="tabs-bar__wrapper"
    type="card"
    v-model="editableTabsValue"
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

        width: calc(100% - 90px);
        height: var(--tab-item-height);

		:deep(.el-tabs__nav-next, .el-tabs__nav-prev) {
			height: var(--tab-item-height);
			line-height: var(--tab-item-height);
		}
		:deep(.el-tabs__header) {
			border-bottom: 0;
			.el-tabs__nav {
				border: 0;
			}
			.el-tabs__item {
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
