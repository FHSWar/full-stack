<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue';
import { getUserInfo, updateSelfInfo } from '@/api/authorization';

const { editable, userInfo } = await getUserInfo() as any;
const dialogVisible = ref(false);

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
		// updateUserInfo
		const params = toRaw(reactiveUserInfo)
			.reduce((acc: any, cur: any) => {
				acc[cur.title] = cur.value;
				return acc;
			}, {});
		await updateSelfInfo({ ...userInfo, ...params });
	}
};
</script>

<template>
  <el-dialog v-model="dialogVisible" width="30%">
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
      <el-button type="primary" @click="edit">
        {{ disabled ? '编辑': '确认' }}
      </el-button>
    </div>
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
            bottom: 12px;
        }
        .el-form {
            width: 80%;
        }
    }
}
</style>
