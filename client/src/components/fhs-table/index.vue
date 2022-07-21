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
      <div class="empty">
        <result />
        暂无数据
      </div>
    </template>
  </el-table>
</template>

<style lang="scss" scoped>
/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-table__inner-wrapper) {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
}

/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-table__body-wrapper) {
  position: relative;
  flex: 1;
}
/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-table__empty-block) {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.table {
  &__wrapper {
    display: flex;
    flex: 1;
  }
}
</style>
