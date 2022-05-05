<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { computed, nextTick, ref, watch } from 'vue';
import { useStore } from '@/stores';
import { constantRoutes } from '@/router/constant';

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
  <el-breadcrumb :separator-icon="ArrowRight">
    <template v-for="{icon, id, page, title} in breadcrumb" :key="id">
      <transition name="el-fade-in">
        <el-breadcrumb-item v-if="page" :to="{ name: page }" v-show="showBreadcrumb">
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
