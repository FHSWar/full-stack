<script lang="ts" setup>
import { computed, ref } from 'vue';
import loginView from './login-form.vue';

const activeName = ref('login');
const showRegister = computed(() => (activeName.value !== 'login'));
</script>

<template>
  <div class="login__wrapper">
    <el-tabs
      v-model="activeName"
      class="login__container"
      type="border-card"
    >
      <el-tab-pane label="登陆" name="login" stretch>
        <login-view :key="'first'" />
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <login-view v-if="showRegister" :key="'second'" :show-double-check="true" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: var(--el-fill-color-light);
  }

  &__container {
    position: absolute;
    top: 30%;
    right: 20%;
    width: 360px;
  }

  &__button {
    width: 100%;
  }
}
</style>
