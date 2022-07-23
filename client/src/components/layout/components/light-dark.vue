<script lang="ts" setup>
import { computed, watchEffect } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import { useStore } from '@/stores';

const isDark = useDark();
const toggleDarkClass = useToggle(isDark);

const store = useStore();

const icon = computed(() => (isDark.value ? 'Moon' : 'Sunny'));
const iconColor = computed(() => (isDark.value ? 'silver' : '#ff9954'));
const toggleDark = () => { toggleDarkClass(); };

watchEffect(() => { store.themeConfig.themeColor = isDark.value ? 'dark' : 'light'; });
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
