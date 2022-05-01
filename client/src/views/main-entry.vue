<script lang="ts" setup>
import { test } from '@/api/authorization';

const testToken = async () => {
	const res = await test({ a: 1, b: 2, c: 3 });
	console.log('testToken', res);
};
</script>

<template>
  <el-container class="common-layout">
    <el-aside width="200px" class="common-layout__aside">
      超酷侧边栏
      <el-button type="primary" @click="testToken">
        测试token
      </el-button>
    </el-aside>
    <el-container>
      <el-header class="common-layout__header">
        帅炸顶栏
      </el-header>
      <el-main class="common-layout__main">
        不得了的仪表盘
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss">
.common-layout {
    width: 100%;
    height: 100%;
    &__aside {
      height: 100%;
      background-color: green;
    }
    &__header {
      width: 100%;
      background-color: red;
    }
    &__main {
      width: 100%;
      color: white;
      background-color: blue;
    }
}
</style>
