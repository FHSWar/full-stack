<script lang="ts" setup>
import type { FhsTableColumn as FhsTableColumnType } from '@/utils';
import FhsTableColumn from './fhs-table-column.vue';
import Result from '@/components/result';

defineProps<{
  expand?: boolean
  selection?: boolean
  tableColumns: FhsTableColumnType[]
  tableData: any[]
}>();
const headerColor = { backgroundColor: '#f5f7fa' };

const emit = defineEmits(['buttonClick', 'selectChange']);

const buttonClick = (desc: string, row: any) => { emit('buttonClick', desc, row); };
const selectionChange = (val: any[]) => { emit('selectChange', val); };
</script>

<template>
  <el-table
    class="table__wrapper"
    stripe
    :header-cell-style="headerColor"
    :data="tableData"
    @selection-change="selectionChange"
  >
    <!-- 可展开 -->
    <el-table-column v-if="expand" type="expand" fixed>
      <template #default="props">
        <slot
          name="expand"
          :index="props.$index"
          :row="props.row"
        />
      </template>
    </el-table-column>

    <!-- 可多选 -->
    <el-table-column v-if="selection" type="selection" width="55" fixed />

    <!-- 表格主体，可多行 -->
    <template v-for="column in tableColumns" :key="column.label">
      <fhs-table-column :column="column" @button-click="buttonClick" />
    </template>

    <!-- 无数据缺省图，一般有数据的 -->
    <template #empty>
      <div class="empty">
        <result />
        暂无数据
      </div>
    </template>
  </el-table>
</template>

<style lang="scss" scoped>
@use "./default-empty.scss";

.table {
  &__wrapper {
    display: flex;
    flex: 1;
  }
}
</style>
