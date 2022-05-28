<script lang="ts" setup>
import { ref } from 'vue';
import type { FhsTableColumn } from '@/utils';

defineProps<{
    tableColumns: FhsTableColumn[]
    tableData: any[]
}>();
const emit = defineEmits(['buttonClick']);

const popoverRef = ref(null) as any;
// 偷懒了，应该可以不遍历的
const hidePopover = () => {
	popoverRef.value.forEach((popoverInstance: any) => { popoverInstance.hide(); });
};

const confirmRemove = (description: string, scope: any) => {
	emit('buttonClick', description, scope.row);
	hidePopover();
};
</script>

<template>
  <el-table class="table__wrapper" stripe :data="tableData">
    <template v-for="{align, buttons, label, prop, width} in tableColumns" :key="label">
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
            <el-popover
              v-else
              ref="popoverRef"
              placement="top"
              trigger="click"
            >
              <template #reference>
                <el-button
                  :type="type"
                  :link="link"
                  @click="emit('buttonClick', '预删除', scope.row)"
                >
                  {{ description }}
                </el-button>
              </template>
              <!-- 删除的确定 -->
              <div class="table__double-check">
                <el-button type="danger" @click="confirmRemove(description, scope)">
                  删除
                </el-button>
                <el-button @click="hidePopover()">
                  取消
                </el-button>
              </div>
            </el-popover>
          </template>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<style lang="scss" scoped>
.table {
  &__double-check {
    display: flex;
    justify-content: space-between;
  }
}
</style>
