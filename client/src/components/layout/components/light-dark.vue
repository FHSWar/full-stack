<script lang="ts" setup>
import { computed } from 'vue';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDarkClass = useToggle(isDark);

const icon = computed(() => (isDark.value ? 'Moon' : 'Sunny'));
const iconColor = computed(() => (isDark.value ? 'silver' : '#ff9954'));
const toggleDark = () => { toggleDarkClass(); };
</script>

<template>
  <use-icon class="toggle-icon" :icon="icon" @click="toggleDark" />
</template>

<style lang="scss" scoped>
.toggle-icon {
  flex-shrink: 0;
  margin-left: 12px;
  font-size: var(--el-font-size-extra-large);
  color: v-bind("iconColor");
}
</style>
