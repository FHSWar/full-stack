<script setup lang="ts">
import { usePiniaPersistance } from '@/utils';

usePiniaPersistance();
</script>

<template>
  <router-view />
</template>

<style lang="scss">
html, body {
  height: 100vh;

  #app {
    height: 100%;
  }
}
</style>
