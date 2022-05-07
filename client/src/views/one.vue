<script lang="ts" setup>
import { testToken } from '@/api/authorization';

const test = async () => {
	await testToken({ a: 1, b: 2, c: 3 });
};
</script>

<template>
  test1
  <el-button type="primary" @click="test">
    测试token
  </el-button>
</template>
<style lang="scss" scoped>
</style>
