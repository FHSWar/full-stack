<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '@/stores';
import { initMenuTree } from '@/utils';
import headerTitle from '@/components/layout/components/header-title.vue';
import menuTree from '@/components/layout/components/menu-tree.vue';

const store = useStore();
// 用全局状态的值来做初始化
const isCollapse = computed(() => store.themeConfig.isAsideMenuCollapse);
const deg = computed(() => (isCollapse.value ? '0' : '180deg'));

const toggleAside = () => { store.themeConfig.isAsideMenuCollapse = !store.themeConfig.isAsideMenuCollapse; };

const { activePageId, sideMenu } = initMenuTree();
</script>

<template>
  <el-scrollbar class="aside-menu__wrapper">
    <header-title />
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
