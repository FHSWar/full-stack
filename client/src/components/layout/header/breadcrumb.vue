<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useStore } from '@/stores';

const breadcrumb = computed(() => useStore().breadcrumb);
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
