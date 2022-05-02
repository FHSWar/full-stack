<script lang="ts" setup>
import { ref } from 'vue';
import loginView from './login-form.vue';

const activeName = ref('login');
const showRegister = ref(false);

const handleClick = () => {
	if (activeName.value === 'register') showRegister.value = true;
};

</script>

<template>
  <div class="login__wrapper">
    <el-tabs
      class="login__container"
      v-model="activeName"
      type="border-card"
      @tab-click="handleClick"
    >
      <el-tab-pane label="登陆" name="login" stretch>
        <login-view />
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <login-view v-if="showRegister" :show-double-check="true" />
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
    background-color: #409EFF;
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
