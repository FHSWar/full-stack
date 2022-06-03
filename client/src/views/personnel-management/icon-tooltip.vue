<script lang="ts" setup>
defineProps<{iconColor?: string}>();
// vue3弃用.native修饰符，需icon自己emit事件
defineEmits(['click']);
</script>

<template>
  <el-tooltip
    placement="bottom-start"
    :hide-after="0"
    :show-after="1000"
  >
    <use-icon
      icon="WarningFilled"
      @click="$emit('click')"
    />
    <template #content>
      <slot />
    </template>
  </el-tooltip>
</template>

<style scoped>
.el-icon {
    margin-left: 12px;
    color: v-bind("iconColor");
    font-size: large;
}
</style>
