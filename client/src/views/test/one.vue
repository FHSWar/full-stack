<script lang="ts" setup>
import { test } from '@/api/authorization';

const testToken = async () => {
	const res = await test({ a: 1, b: 2, c: 3 });
	console.log('testToken', res);
};
</script>

<template>
  test1
  <el-button type="primary" @click="testToken">
    测试token
  </el-button>
</template>
<style lang="scss" scoped>
</style>
