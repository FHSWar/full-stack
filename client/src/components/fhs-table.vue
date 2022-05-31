<script lang="ts" setup>
import type { FhsTableColumn } from '@/utils';
import DoubleCheckRemove from '@/components/double-check-remove.vue';

defineProps<{
    tableColumns: FhsTableColumn[]
    tableData: any[]
}>();
const emit = defineEmits(['buttonClick']);
</script>

<template>
  <el-table class="table__wrapper" stripe :data="tableData">
    <template v-for="{align, buttons, editable, label, prop, width} in tableColumns" :key="label">
      <!-- 一般就是数据展示 -->
      <el-table-column :align="align" :label="label" :prop="prop" :width="width">
        <!-- 偶尔会用到按钮 -->
        <template v-if="buttons" #default="scope">
          <template v-for="{description, type, link, doubleCheck} in buttons" :key="description">
            <el-button
              v-if="!doubleCheck"
              :type="type"
              :link="link"
              @click="emit('buttonClick', description, scope.row)"
            >
              {{ description }}
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
        <template v-else-if="editable" #default="scope">
          <el-input
            autosize
            type="textarea"
            v-model="scope.row.description"
            :disabled="!scope.row.editing"
          />
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
