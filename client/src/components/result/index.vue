<script lang="ts" setup>
/* 这个并没有使用，但写得不错，用作index.tsx的对比 */
import { shallowRef } from 'vue';
import { useRoute } from 'vue-router';

const resultType = shallowRef(null) as any;
switch (useRoute().params.type) {
	case 'no-found':
		import('./no-found').then((val) => { resultType.value = val.default; });
		break;
	case 'server-error':
		import('./server-error').then((val) => { resultType.value = val.default; });
		break;
	case 'unauthorized':
		import('./unauthorized').then((val) => { resultType.value = val.default; });
		break;
	default:
}
</script>

<template>
  <div class="result__wrapper">
    <component :is="resultType" />
  </div>
</template>

<style scoped lang="scss">
.result {
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
