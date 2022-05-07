<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserFilled } from '@element-plus/icons-vue';
import { setLocal } from '@/utils';
import userInfoDialog from './user-info-dialog.vue';

const showDialogBool = ref(false);
const showDialog = async () => { showDialogBool.value = true; };
const fromChild = () => { showDialogBool.value = false; };

const router = useRouter();
const logout = () => {
	setLocal('token', '');
	router.push({ name: 'login' });
};

const menuList = [
	{
		icon: 'Avatar',
		desc: '个人设置',
		method: showDialog
	},
	{
		icon: 'CircleCloseFilled',
		desc: '退出登陆',
		method: logout
	}
];
</script>

<template>
  <el-popover
    class="popover__wrapper"
    placement="bottom"
    trigger="hover"
    :offset="-1"
    :show-arrow="false"
  >
    <template #reference>
      <div class="popover__avatar">
        <el-avatar :icon="UserFilled" />
        <span class="popover__username">123</span>
      </div>
    </template>
    <div class="popover__container">
      <p
        class="popover__item"
        v-for="{icon, desc, method} in menuList"
        :key="desc"
        @click="method"
      >
        <use-icon :icon="icon" />
        <span class="popover__desc">{{ desc }}</span>
      </p>
    </div>
  </el-popover>
  <Suspense>
    <user-info-dialog
      :model-value="showDialogBool"
      @update:model-value="fromChild"
    />
  </Suspense>
</template>

<style lang="scss" scoped>
.popover {
    &__avatar {
        display: flex;
        align-items: center;
    }
    &__username {
        text-indent: .5em;
    }
    &__container {
        padding: 4px;
    }
    &__item {
        display: flex;
        align-items: center;
        border-radius: var(--el-border-radius-base);
        height: 36px;
        padding-left: 12px;

        &:hover {
            background-color: var(--el-color-primary-light-8);
        }
    }
    &__desc {
        text-indent: 1em;
    }
}
</style>
