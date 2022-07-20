<script lang="ts" setup>
import type { FhsTableColumn as FhsTableColumnType } from '@/utils';
import FhsTableColumn from './fhs-table-column.vue';
import Result from '@/components/result';

defineProps<{
    tableColumns: FhsTableColumnType[]
    tableData: any[]
}>();

const emit = defineEmits(['buttonClick']);

const buttonClick = (desc: string, row: any) => {
	emit('buttonClick', desc, row);
};
</script>

<template>
  <el-table class="table__wrapper" stripe :data="tableData">
    <template
      v-for="column in tableColumns" :key="column.label"
    >
      <fhs-table-column :column="column" @button-click="buttonClick" />
    </template>
    <template #empty>
      <div>
        <result />
        暂无数据
      </div>
    </template>
  </el-table>
</template>
