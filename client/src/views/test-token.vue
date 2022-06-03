<script lang="ts" setup>
import { testToken } from '@/api/authorization';

const test = async () => {
	await testToken();
};
</script>

<template>
  <div>
    <el-button type="primary" @click="test">
      测试token
    </el-button>
  </div>
</template>
<style lang="scss" scoped>
</style>
