<script lang="ts" setup>
import type { FhsTableColumn as FhsTableColumnType } from '@/utils';
import FhsTableColumn from './fhs-table-column.vue';

defineProps<{
    tableColumns: FhsTableColumnType[]
    tableData: any[]
}>();
</script>

<template>
  <el-table class="table__wrapper" stripe :data="tableData">
    <template
      v-for="column in tableColumns" :key="column.label"
    >
      <fhs-table-column :column="column" />
    </template>
  </el-table>
</template>
