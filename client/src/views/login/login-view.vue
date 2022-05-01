<script lang="ts" setup="props">
import { reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance } from 'element-plus';
import { login, register } from '@/api/authorization';
import { useStore } from '@/stores';

const props = defineProps({
	showDoubleCheck: {
		type: Boolean,
		default: false
	}
});
const { showDoubleCheck } = toRefs(props);
const router = useRouter();

const form = reactive({
	username: '',
	password: '',
	checkPassword: ''
});
const handleLogin = async (params: typeof form) => {
	const suc:any = await login(params);
	const token:string = `Bearer ${suc.token}`;
	useStore().token = token;
	localStorage.setItem('token', token);
	router.push({ name: 'home' });
};

const ruleFormRef = ref<FormInstance>();
const validateName = (rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('请输入用户名'));
	} else {
		callback();
	}
};
const validatePass = (rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('请输入密码'));
	} else {
		callback();
	}
};
const validatePass2 = (rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('请再次输入密码'));
	} else if (value !== form.password) {
		callback(new Error('两次输入密码不一致'));
	} else {
		callback();
	}
};
const rules = reactive({
	username: [{
		validator: validateName, trigger: 'blur'
	}],
	password: [{
		validator: validatePass, trigger: 'blur'
	}],
	checkPassword: [{
		validator: validatePass2, trigger: 'blur'
	}]
});
const submitForm = (formEl: FormInstance | undefined, isRegister:boolean = false) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			isRegister
				? register(form)
				: handleLogin(form);
		} else {
			console.log('表单格式错误!');
			return false;
		}
	});
};
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};
</script>

<template>
  <el-form
    status-icon
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item v-if="showDoubleCheck" label="确认密码" prop="checkPassword">
      <el-input v-model="form.checkPassword" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button v-if="showDoubleCheck" type="primary" class="login__button" @click="submitForm(ruleFormRef, true)">
        注册
      </el-button>
      <el-button v-else type="primary" class="login__button" @click="submitForm(ruleFormRef)">
        登陆
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button class="login__button" @click="resetForm(ruleFormRef)">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.login {
  &__button {
    width: 100%;
  }
}
</style>
