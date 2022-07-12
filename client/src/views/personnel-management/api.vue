<script lang="ts" setup>
const addApiPermission = () => {
	console.log('addApiPermission');
};
</script>

<template>
  <div>
    <el-button type="primary" plain @click="addApiPermission">
      新增需控制的api
    </el-button>
  </div>
</template>
