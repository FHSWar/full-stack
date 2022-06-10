<script lang="ts" setup>
import type { FhsTableColumn } from '@/utils';
import DoubleCheckRemove from '@/components/double-check-remove.vue';

defineProps<{column: FhsTableColumn}>();

const emit = defineEmits(['buttonClick']);
</script>

<template>
  <!-- 一般就是数据展示 -->
  <el-table-column
    :align="column.align"
    :label="column.label"
    :prop="column.prop"
    :width="column.width"
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
      <template v-for="{description, type, link, doubleCheck} in column.buttons" :key="description">
        <el-button
          v-if="!doubleCheck"
          :type="type"
          :link="link"
          @click="emit('buttonClick', description, scope.row)"
        >
          {{ scope.row.editing ? '确认': description }}
        </el-button>
        <double-check-remove
          v-else
          @confirm-remove="emit('buttonClick', description, scope.row);"
        >
          <el-button
            :type="type"
            :link="link"
            @click="emit('buttonClick', '预删除', scope.row)"
          >
            {{ description }}
          </el-button>
        </double-check-remove>
      </template>
    </template>
    <!-- 更偶尔会用到行内编辑 -->
    <template v-else-if="column.editable" #default="scope">
      <el-input
        autosize
        type="textarea"
        v-model="scope.row.description"
        :disabled="!scope.row.editing"
      />
    </template>
  </el-table-column>
</template>
