<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useStore } from '@/stores';
import { constantRoutes } from '@/router/constant';

const store = useStore();

const breadcrumb = computed(() => {
	if (store.breadcrumb.length > 0) return store.breadcrumb;
	return constantRoutes;
});
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
