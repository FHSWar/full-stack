<script lang="ts" setup>
import { useRoute } from 'vue-router';
import NoFound from './no-found';
import ServerError from './server-error';
import Unauthorized from './unauthorized';

const route = useRoute();
const resultType = route.params.type;
</script>

<template>
  <div class="result__wrapper">
    <NoFound v-if="resultType === 'no-found'" />
    <server-error v-else-if="resultType === 'server-error'" />
    <unauthorized v-else />
  </div>
</template>

<style scoped>
.result__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
