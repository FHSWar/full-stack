<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import { getRoutesByRole } from '@/api/personnel';
import { fallbackRoutes } from '@/router';
import { useStore } from '@/stores';
import { flattenMenuTree, getLocal } from '@/utils';
import type { MenuTree } from '@/utils';
import sideHeader from './aside-header.vue';
import menuTree from './menu-tree.vue';

const store = useStore();
// 用全局状态的值来做初始化
const initIsCollapase = store.themeConfig.isAsideMenuCollapse;
const isCollapse = ref(initIsCollapase);
const deg = computed(() => (isCollapse.value ? '0' : '180deg'));
// 全局的面包屑用constantRoutes做兜底，必有id可用
const activePageId = computed(() => store.breadcrumb.at(-1)!.id);
const sideMenu = ref([] as MenuTree);

watchEffect(() => { store.themeConfig.isAsideMenuCollapse = isCollapse.value; });

const toggleAside = () => { isCollapse.value = !isCollapse.value; };

const initMenuTree = async () => {
	// getLocal('menuTree')为truthy说明还有登陆态，复用即可，不需要请求
	if (getLocal('menuTree')) {
		sideMenu.value = store.menuTree;
		return;
	}

	try {
		const { routes } = await getRoutesByRole() as any;
		sideMenu.value = JSON.parse(routes);
		store.menuTree = sideMenu.value;
		store.menuList = flattenMenuTree(sideMenu.value);
	} catch (e) {
		console.warn('初始状态。');
		sideMenu.value = fallbackRoutes;
		store.menuTree = sideMenu.value;
		store.menuList = flattenMenuTree(sideMenu.value);
	}
};
initMenuTree();
</script>

<template>
  <el-scrollbar class="aside-menu__wrapper">
    <sideHeader />
    <!-- 一个侧边菜单只应有一个el-menu作为根，不应该被递归到 -->
    <el-menu
      class="aside-menu__magic-trick"
      :default-active="activePageId"
      :default-openeds="[]"
      :collapse="isCollapse"
    >
      <menu-tree :aside-menu-tree="sideMenu" />
      <el-menu-item class="aside-menu__footer" index="footer-menu-item">
        <use-icon class="aside-menu__toggle-icon" icon="Expand" @click="toggleAside" />
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.aside-menu {
  // https://juejin.cn/post/6844903815527956494#comment
  &__magic-trick {
    // 收起时菜单也应该竖向撑满
    height: 100%;

    /* stylelint-disable-next-line selector-class-pattern */
    &:not(.el-menu--collapse) {
      width: 300px;
    }
  }

  &__footer {
    position: absolute;
    bottom: 0;
    width: 100%;

    // var(--el-menu-item-height) 组件外用不了
    height: 56px;
  }

  &__toggle-icon {
    position: absolute;
    top: 28px;
    font-size: 24px;
    transform: translate3d(0, -50%, 0) rotateY(v-bind("deg"));
  }
}
</style>
