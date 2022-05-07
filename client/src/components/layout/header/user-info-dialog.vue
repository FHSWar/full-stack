<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue';
import { getUserInfo, updateSelfInfo } from '@/api/authorization';
import { useStore } from '@/stores';
import { setLocal } from '@/utils';
import editPasswordDialog from './edit-password-dialog.vue';

const { editable, userInfo } = await getUserInfo() as any;
const emit = defineEmits(['update:modelValue']);

const buildReactive = (obj: any) => {
	const keyArr = Object.keys(obj).filter((key) => !key.startsWith('_'));
	return reactive(keyArr.reduce((acc, cur) => {
		acc.push({
			title: cur,
			value: obj[cur]
		});
		return acc;
	}, [] as any));
};
const reactiveUserInfo = buildReactive(userInfo);

const disabled = ref(true);
const edit = async () => {
	if (disabled.value) disabled.value = false;
	else {
		const params = toRaw(reactiveUserInfo)
			.reduce((acc: any, cur: any) => {
				acc[cur.title] = cur.value;
				return acc;
			}, {});

		const store = useStore();

		// 改完信息更新token和userInfo
		const { token } = await updateSelfInfo({ ...userInfo, ...params }) as any;
		const bearer = `Bearer ${token}`;
		store.token = bearer;
		setLocal('token', bearer);

		const { userInfo: newUserInfo } = await getUserInfo() as any;
		store.userInfo = newUserInfo;
		setLocal('userInfo', newUserInfo);

		disabled.value = true;
		emit('update:modelValue');
	}
};

const showEditPasswordBool = ref(false);
const showEditPassword = () => { showEditPasswordBool.value = true; };
const closeDialog = () => {
	showEditPasswordBool.value = false;
	emit('update:modelValue');
};
const fromChild = (str: string) => {
	showEditPasswordBool.value = false;
	if (str === 'closeParent') emit('update:modelValue');
};
</script>

<template>
  <el-dialog width="30%" @close="closeDialog">
    <div class="dialog__wrapper">
      <el-avatar :size="50" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
      <el-form
        status-icon
        label-width="92px"
        class="demo-ruleForm"
      >
        <el-form-item
          v-for="({title}, index) in reactiveUserInfo"
          :key="title"
          :label="title"
        >
          <el-input
            v-model="reactiveUserInfo[index].value"
            :disabled="disabled || !editable.includes(title)"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div class="dialog__footer">
        <el-button @click="showEditPassword">
          修改密码
        </el-button>
        <el-button type="primary" @click="edit">
          {{ disabled ? '编辑': '确认' }}
        </el-button>
      </div>
    </div>
    <edit-password-dialog
      :model-value="showEditPasswordBool"
      @update:model-value="fromChild"
    />
  </el-dialog>
</template>

<style lang="scss" scoped>
.dialog {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .el-avatar {
      position: relative;
      bottom: 16px;
    }
    .el-form {
      width: 88%;
    }
  }
  &__footer {
    display: flex;
    justify-content: end;
    width: 88%;
  }
}
</style>
