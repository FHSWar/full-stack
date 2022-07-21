<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';
import { constantRoutes } from '@/router/constant';
import { useStore } from '@/stores';

const store = useStore();

const showBreadcrumb = ref(true);
const breadcrumb = computed(() => {
	if (store.breadcrumb.length > 0) return store.breadcrumb;
	return constantRoutes;
});
watch(breadcrumb, async () => {
	showBreadcrumb.value = false;
	await nextTick();
	showBreadcrumb.value = true;
});
</script>

<template>
  <el-breadcrumb class="breadcrumb__wrapper" :separator-icon="ArrowRight">
    <template v-for="{ icon, id, page, title } in breadcrumb" :key="id">
      <transition name="el-fade-in">
        <el-breadcrumb-item v-if="page" v-show="showBreadcrumb" :to="{ name: page }">
          <use-icon v-if="icon" :icon="icon" />
          {{ title }}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-else v-show="showBreadcrumb">
          <use-icon v-if="icon" :icon="icon" />
          {{ title }}
        </el-breadcrumb-item>
      </transition>
    </template>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-breadcrumb__inner) {
  font-size: var(--el-font-size-small);

  .el-icon {
    position: relative;
    top: 1.5px;
    color: var(--el-color-primary);
  }
}
</style>
