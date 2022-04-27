<script lang="ts" setup>
const a = 1;
console.log(a);
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <div style="height:100%; background-color:aliceblue;">
          aside
        </div>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
.common-layout {
    height: 100%;
}
</style>
