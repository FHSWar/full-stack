<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const toNew = () => { router.push({ name: 'test-new-stuff' }); };
</script>

<template>
  <div>
    <el-button @click="toNew">
      跳转到不在侧边栏的路由
    </el-button>
    <img src="@/assets/images/后台系统——登陆与权限.svg" alt="">
  </div>
</template>
