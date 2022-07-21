<script lang="ts" setup>
import type { FhsTableColumn } from '@/utils';
import DoubleCheckRemove from '@/components/double-check-remove.vue';

defineProps<{column: FhsTableColumn}>();
defineEmits(['buttonClick']);
</script>

<template>
  <!-- 一般就是数据展示 -->
  <el-table-column
    show-overflow-tooltip
    :align="column.align"
    :fixed="column.fixed"
    :label="column.label"
    :prop="column.prop"
    :sortable="column.sortable"
    :width="column.width"
    :min-width="column.minWidth"
  >
    <!-- 更更偶尔会用到多行表头 -->
    <template v-if="column?.children?.length" #default>
      <fhs-table-column
        v-for="childColumn in column.children"
        :key="childColumn.label"
        :column="childColumn"
      />
    </template>
    <!-- 偶尔会用到按钮 -->
    <template v-else-if="column.buttons" #default="scope">
      <template
        v-for="{
          description,
          doubleCheck,
          link,
          type,
          isEditButton
        } in column.buttons"
        :key="description"
      >
        <el-button
          v-if="!doubleCheck"
          plain
          :type="type"
          :link="link"
          @click="$emit('buttonClick', description, scope.row)"
        >
          {{ scope.row.editing && isEditButton ? '确认': description }}
        </el-button>
        <double-check-remove
          v-else
          @confirm-remove="$emit('buttonClick', description, scope.row);"
        >
          <el-button
            plain
            :type="type"
            :link="link"
            @click="$emit('buttonClick', '预删除', scope.row)"
          >
            {{ description }}
          </el-button>
        </double-check-remove>
      </template>
    </template>
    <!-- 更偶尔会用到行内编辑 -->
    <template v-else-if="column.editable" #default="scope">
      <template v-if="scope.row.editing">
        <el-input
          v-model="scope.row[column.prop]"
          autosize
          type="textarea"
        />
      </template>
      <template v-else>
        <span>
          {{ scope.row[column.prop] || '-' }}
        </span>
      </template>
    </template>
  </el-table-column>
</template>
