<script lang="ts" setup>
import { inject, reactive, ref } from 'vue';
import type { Ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { useStore } from '@/stores';
import { encryptPassword } from '@/utils';
import { getUserInfo, updateSelfInfo } from '@/api/authorization';

const emit = defineEmits(['update:modelValue']);
const dialogVisible = inject('dialogVisible') as Ref<boolean>;

const form = reactive({
	oldPassword: '',
	password: '',
	checkPassword: ''
});
const ruleFormRef = ref<FormInstance>();
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
	} else if (value === form.oldPassword) {
		callback(new Error('密码没有变更'));
	} else if (value !== form.password) {
		callback(new Error('两次输入密码不一致'));
	} else {
		callback();
	}
};
const rules = reactive({
	oldPassword: [{ validator: validatePass, trigger: 'blur' }],
	password: [{ validator: validatePass, trigger: 'blur' }],
	checkPassword: [{ validator: validatePass2, trigger: 'blur' }]
});

const changePassword = async (params: typeof form) => {
	const store = useStore();

	params.password = encryptPassword(params.password);
	params.oldPassword = encryptPassword(params.oldPassword);

	// 改完信息更新token和userInfo
	const { token } = await updateSelfInfo({ ...store.userInfo, ...params }) as any;
	const bearer = `Bearer ${token}`;
	store.token = bearer;

	const { userInfo: newUserInfo } = await getUserInfo() as any;
	store.userInfo = newUserInfo;

	emit('update:modelValue', 'closeParent');
};

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			changePassword(form);
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
const closeDialog = () => { emit('update:modelValue'); };
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    width="30%"
    append-to-body
    @close="closeDialog"
  >
    <el-form
      status-icon
      ref="ruleFormRef"
      label-width="68px"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="form.oldPassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input v-model="form.checkPassword" type="password" autocomplete="off" />
      </el-form-item>
    </el-form>
    <el-button type="primary" class="edit-dialog__button" @click="submitForm(ruleFormRef)">
      确认
    </el-button>
    <el-button class="edit-dialog__button" @click="resetForm(ruleFormRef)">
      重置
    </el-button>
  </el-dialog>
</template>

<style lang="scss" scoped>
.edit-dialog {
  &__button {
	margin: 0;
    width: 100%;
	&:nth-of-type(2) {
		margin-top: 8px;
	}
   }
}
</style>
