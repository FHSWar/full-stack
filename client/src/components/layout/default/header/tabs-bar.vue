<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { TabPanelName, TabsPaneContext } from 'element-plus';
import { constantRoutes } from '@/router';
import { useStore } from '@/stores';
import { findMenuListChain } from '@/utils';
import type { MenuList } from '@/utils';
import PopoverOptions from './popover-options.vue';

const router = useRouter();
const store = useStore();

// 固定的页面不可关闭
const tabClosable = computed(() => {
	const constantTabNameArr = constantRoutes.map(({ page }) => page);
	return (tabName:string) => {
		if (constantTabNameArr.includes(tabName)) return false;
		return true;
	};
});
// 访问过的页面
const visited = computed(() => store.visitedRoutes);
const syntheticRoutes = computed(() => {
	const dynamicTabs = visited.value.map(({ title, page }) => ({ title, page }));
	return [...constantRoutes, ...dynamicTabs];
});

// 当前访问页面应高亮，prev作为fallback
let prevEditableTab = constantRoutes.at(-1)!.page;
const activeTabName = ref(prevEditableTab);
const activeTabIndex = computed(() => visited.value.findIndex(({ page }) => page === activeTabName.value));
const toActivePage = () => { router.push({ name: activeTabName.value }); };

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
watchEffect(() => { maintainBreadCrumb(activeTabName.value); });

// 点击tab跳转，点击叉号去除对应tab并维护路由跳转
const tabClick = (tab:TabsPaneContext) => {
	// page一定维护字符串
	const tabName = tab.paneName as string;

	maintainBreadCrumb(tabName);
	router.push({ name: tabName });
};
const tabRemove = (tabName:TabPanelName) => {
	const pageIndexInVisitedRoutes = visited.value.findIndex(({ page }) => page === tabName);
	store.visitedRoutes = visited.value.filter(({ page }) => page !== tabName);

	let targetPage: string;
	const fallbackPage = constantRoutes[0].page as string;
	targetPage = fallbackPage;

	if (pageIndexInVisitedRoutes >= 1) {
		const targetMenuItem = visited.value[pageIndexInVisitedRoutes - 1];
		if (targetMenuItem.page) targetPage = targetMenuItem.page;
	}

	maintainActiveTab(targetPage);
	router.push({ name: targetPage });
};

const animation = ref('');
const onMouseEnter = () => { animation.value = 'tabs-bar__menu-icon--reverse'; };
const onPopoverLeave = () => { animation.value = 'tabs-bar__menu-icon--rotate'; };

const popoverRef = ref(null);
const closeOthers = () => {
	store.visitedRoutes = visited.value.filter(({ page }) => page === activeTabName.value);
	toActivePage();
};
const closeLeft = () => { store.visitedRoutes = visited.value.slice(activeTabIndex.value); toActivePage(); };
// 刚好不用单独处理在固定路由点击的情况，哈哈
const closeRight = () => { store.visitedRoutes = visited.value.slice(0, activeTabIndex.value + 1); toActivePage(); };
const closeAll = () => { store.visitedRoutes = []; activeTabName.value = constantRoutes[0].page; toActivePage(); };
const optionList = [
	{
		icon: 'CloseBold',
		desc: '关闭其他',
		method: closeOthers
	},
	{
		icon: 'ArrowLeftBold',
		desc: '关闭左侧',
		method: closeLeft
	},
	{
		icon: 'ArrowRightBold',
		desc: '关闭右侧',
		method: closeRight
	},
	{
		icon: 'CloseBold',
		desc: '关闭全部',
		method: closeAll
	}
];
const triggerMethod = (method: () => void) => { method(); (popoverRef.value as any)?.hide(); };
</script>

<template>
  <div class="tabs-bar__wrapper">
    <el-tabs
      type="card"
      class="tabs-bar__container"
      v-model="activeTabName"
      @tab-click="tabClick"
      @tab-remove="tabRemove"
    >
      <!-- page为空的在路由守卫处就被挡掉了 -->
      <el-tab-pane
        v-for="{page, title} in syntheticRoutes"
        :key="page"
        :label="title"
        :name="page"
        :closable="tabClosable(page as string)"
      />
    </el-tabs>
    <el-popover
      ref="popoverRef"
      class="tabs-bar__menu"
      placement="bottom"
      trigger="hover"
      :offset="-1"
      :show-arrow="false"
      @after-leave="onPopoverLeave"
    >
      <template #reference>
        <use-icon
          icon="Menu"
          :class="animation"
          :size="18"
          @mouseenter="onMouseEnter"
        />
      </template>
      <popover-options :options="optionList" @method="triggerMethod" />
    </el-popover>
  </div>
</template>
<style lang="scss" scoped>
.tabs-bar {
  // 这一段改标签页样式的css是从vue-admin-better抄的
  &__wrapper {
    --tab-item-height: 32px;

    display: flex;
    align-items: center;
    width: 100%;

    /* stylelint-disable-next-line selector-class-pattern */
    :deep(.el-tabs__header) {
      margin-top: 8px;
      margin-bottom: 0;
      border-bottom: 0;

      .el-tabs {
        &__nav {
          border: 0;
        }

        &__item {
          height: var(--tab-item-height);
          margin-right: 4px;
          line-height: var(--tab-item-height);
          border: var(--el-border);
          border-radius: var(--el-border-radius-base);
        }
      }
    }
  }

  &__container {
    flex: 1;
  }

  &__menu {
    font-size: var(--el-font-size-extra-large);
  }

  &__menu-icon {
    &--rotate {
      animation: spin-clock-wise 0.2s linear;
    }

    &--reverse {
      animation: spin-anti-clock-wise 0.2s linear;
    }
  }
}

@keyframes spin-clock-wise {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(90deg);
  }
}

@keyframes spin-anti-clock-wise {
  from {
    transform: rotate(90deg);
  }

  to {
    transform: rotate(0deg);
  }
}
</style>
