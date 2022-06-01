<script lang="ts" setup>
import type { PopoverOption } from '@/utils';

defineProps<{options: PopoverOption[]}>();
const emit = defineEmits(['method']);
</script>

<template>
  <div class="options__container">
    <p
      class="options__item"
      v-for="{icon, desc, method} in options"
      :key="desc"
      @click="emit('method', method)"
    >
      <use-icon :icon="icon" />
      <span class="options__desc">{{ desc }}</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.options {
    &__item {
        display: flex;
        align-items: center;
        border-radius: var(--el-border-radius-base);
        height: 36px;
        padding-left: 12px;

        &:hover {
            background-color: var(--el-color-primary-light-8);
        }
    }
    &__desc {
        text-indent: 1em;
    }
}
</style>
