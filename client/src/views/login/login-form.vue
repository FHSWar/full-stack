<script lang="ts" setup="props">
import { reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance } from 'element-plus';
import { getUserInfo, login, register } from '@/api/authorization';
import { useStore } from '@/stores';
import { encryptPassword } from '@/utils';

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
	umNo: '',
	password: '',
	checkPassword: ''
});

const handleLogin = async (callFromRegister?: boolean) => {
	if (!callFromRegister) form.password = await encryptPassword(form.password);

	const { token } = await login(form) as any;

	const store = useStore();
	store.token = token;

	const { userInfo } = await getUserInfo() as any;
	store.userInfo = userInfo;

	router.push({ name: 'home' });
};
const handleRegister = async () => {
	form.umNo = form.umNo.toUpperCase();
	form.password = await encryptPassword(form.password);

	await register(form);
	handleLogin(true);
};

const ruleFormRef = ref<FormInstance>();
const validateName = (rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('请输入用户名'));
	} else {
		callback();
	}
};
const validateUM = (rule: any, value: any, callback: any) => {
	const regex = /^[a-zA-Z][a-zA-Z0-9-]*[0-9]$/;
	if (value === '') {
		callback(new Error('请输入工号'));
	} else if (!regex.test(value)) {
		callback(new Error('请输入正确格式的工号'));
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
	username: [{ validator: validateName, trigger: 'blur' }],
	umNo: [{ validator: validateUM, trigger: 'blur' }],
	password: [{ validator: validatePass, trigger: 'blur' }],
	checkPassword: [{ validator: validatePass2, trigger: 'blur' }]
});
const submitForm = (formEl: FormInstance | undefined, isRegister:boolean = false) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			isRegister
				? handleRegister()
				: handleLogin();
		} else {
			console.warn('表单格式错误!');
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
    label-width="68px"
    :model="form"
    :rules="rules"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item v-if="showDoubleCheck" label="工号" prop="umNo">
      <el-input v-model="form.umNo" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" />
    </el-form-item>
    <el-form-item v-if="showDoubleCheck" label="确认密码" prop="checkPassword">
      <el-input v-model="form.checkPassword" type="password" />
    </el-form-item>
  </el-form>
  <el-button v-if="showDoubleCheck" type="primary" class="login__button" @click="submitForm(ruleFormRef, true)">
    注册
  </el-button>
  <el-button v-else type="primary" class="login__button" @click="submitForm(ruleFormRef)">
    登陆
  </el-button>
  <el-button class="login__button" @click="resetForm(ruleFormRef)">
    重置
  </el-button>
</template>

<style lang="scss" scoped>
.login {
  &__button {
    width: 100%;
    margin: 0;

    &:nth-of-type(2) {
      margin-top: 8px;
    }
  }
}
</style>
