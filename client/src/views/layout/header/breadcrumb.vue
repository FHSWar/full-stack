<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useStore } from '@/stores';

const breadcrumb = computed(() => useStore().breadcrumb);
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ name: 'home' }">
      首页
    </el-breadcrumb-item>
    <template v-for="{id, page, title} in breadcrumb" :key="id">
      <el-breadcrumb-item v-if="page" :to="{ name: page }">
        {{ title }}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-else>
        {{ title }}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
