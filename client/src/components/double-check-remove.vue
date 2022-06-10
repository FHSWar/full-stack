<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits(['confirmRemove']);

const popoverRef = ref(null) as any;

const hidePopover = () => { popoverRef.value.hide(); };
const confirmAndHide = () => {
	emit('confirmRemove');
	hidePopover();
};
</script>

<template>
  <el-popover
    ref="popoverRef"
    class="double-check__wrapper"
    placement="top"
    trigger="click"
  >
    <template #reference>
      <slot>
        <el-button link>
          移除
        </el-button>
      </slot>
    </template>
    <!-- 删除的确定 -->
    <div class="double-check__popover">
      <el-button type="danger" @click="confirmAndHide">
        删除
      </el-button>
      <el-button @click="hidePopover()">
        取消
      </el-button>
    </div>
  </el-popover>
</template>

<style lang="scss" scoped>
.double-check {
  &__popover {
    display: flex;
    justify-content: space-between;
  }
}

.is-link {
  padding: 8px 15px;
}
</style>
