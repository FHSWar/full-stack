<script lang="ts" setup>
import { computed, ref } from 'vue';
import layoutAside from './aside/index.vue';
import breadcrumb from './header/breadcrumb.vue';

// 控制Expand图片翻转，并收展侧边栏
const isExpand = ref(true);
const deg = computed(() => (isExpand.value ? '180deg' : '0'));
const asideWidth = computed(() => (isExpand.value ? '200px' : '60px'));
const toggleAside = () => { isExpand.value = !isExpand.value; };
</script>

<template>
  <el-container class="common-layout">
    <transition>
      <el-aside :width="asideWidth" class="common-layout__aside">
        <layout-aside />
      </el-aside>
    </transition>
    <el-container>
      <el-header class="common-layout__header">
        <use-icon class="common-layout__toggle" icon="Expand" @click="toggleAside" />
        <breadcrumb class="common-layout__breadcrumb" />
      </el-header>
      <el-main class="common-layout__main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss">
.common-layout {
    height: 100%;
    &__aside {
      transition: width 0.2s ease-in-out
    }
    &__toggle {
      position: relative;
      top: 50%;
      transform: translateY(-50%) rotateY(v-bind("deg"));
      font-size: 24px;
    }
    &__header {
      position: relative;
    }
    &__breadcrumb {
      position: absolute;
      left: 60px;
      top: 52%;
      transform: translateY(-50%);
    }
    &__main {
      color: white;
      background-color: #E6A23C;
    }
}
</style>
