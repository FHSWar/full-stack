<script lang="ts" setup>
import { computed, reactive, ref, toRaw } from 'vue';
import { ElMessage } from 'element-plus';
import type { UploadProps } from 'element-plus';
import { getUserInfo, imgBaseUrl, updateSelfInfo, uploadAvatar } from '@/api/authorization';
import { useStore } from '@/stores';
import editPasswordDialog from './edit-password-dialog.vue';

const { editable, userInfo } = await getUserInfo() as any;
const emit = defineEmits(['update:modelValue']);
const store = useStore();

const buildReactive = (obj: any) => {
	const keyArr = Object.keys(obj).filter((key) => !key.startsWith('_'));
	return reactive(keyArr.reduce((acc, cur) => {
		if (cur === 'avatar') return acc;
		acc.push({
			title: cur,
			value: obj[cur]
		});
		return acc;
	}, [] as any));
};
const reactiveUserInfo = buildReactive(userInfo);

const imageUrl = ref('');
const avatarUrl = computed(() => store.userInfo?.avatar);
let avatarFormData:any;
const handleAvatarSuccess: UploadProps['onSuccess'] = (
	response,
	uploadFile
) => {
	imageUrl.value = URL.createObjectURL(uploadFile.raw!);
	console.log('uploadFile', uploadFile);
	console.log('imgBaseUrl', imgBaseUrl);
};
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
	if (rawFile.size / 1024 / 1024 > 1) {
		ElMessage.error('头像体积超过1MB!');
		return false;
	}
	return true;
};
const uploadOnChange: UploadProps['onChange'] = (uploadFile) => {
	imageUrl.value = URL.createObjectURL(uploadFile.raw!);
	const formData = new FormData();
	formData.append('avatar', uploadFile.raw!);
	avatarFormData = formData;
};

const disabled = ref(true);
const edit = async () => {
	if (disabled.value) disabled.value = false;
	else {
		const params = toRaw(reactiveUserInfo)
			.reduce((acc: any, cur: any) => {
				acc[cur.title] = cur.value;
				return acc;
			}, {});

		// 改完信息更新token和userInfo
		if (avatarFormData) await uploadAvatar(avatarFormData);
		const { token } = await updateSelfInfo({ ...userInfo, ...params }) as any;
		const bearer = `Bearer ${token}`;
		store.token = bearer;

		const { userInfo: newUserInfo } = await getUserInfo() as any;
		store.userInfo = newUserInfo;

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
      <div v-if="disabled">
        <el-avatar
          v-if="!avatarUrl"
          shape="square"
          :size="50"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
        <el-avatar
          v-else
          shape="square"
          :size="50"
          :src="`${imgBaseUrl}/${avatarUrl}`"
        />
      </div>
      <el-upload
        v-else
        class="dialog__uploader"
        name="avatar"
        :auto-upload="false"
        :on-change="uploadOnChange"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <el-avatar
          v-if="!imageUrl"
          shape="square"
          :size="50"
          :src="`${imgBaseUrl}/${avatarUrl}`"
        />
        <el-avatar
          v-else
          shape="square"
          :size="50"
          :src="imageUrl"
        />
        <div class="dialog__uploader-hint">
          <use-icon icon="EditPen" />
        </div>
      </el-upload>

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
      margin-bottom: 16px;
    }
    .el-form {
      width: 88%;
    }
  }
  &__uploader {
    position: relative;

    &-hint {
      position: absolute;
      left: 0;
      width: 100%;
      height: 50%;
      text-align: center;
      background-color: rgba(120, 121, 122, 0.5);
    }
  }
  &__footer {
    display: flex;
    justify-content: end;
    width: 88%;
  }
}
</style>
