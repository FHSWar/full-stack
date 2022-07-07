<script setup lang="ts">
import { useAutoLayout, usePiniaPersistance } from '@/utils';

const switchinglayout = useAutoLayout();
usePiniaPersistance();
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition :name="switchinglayout ? 'el-zoom-in-top' : ''">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
