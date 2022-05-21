<script lang="ts" setup>
import { computed, ref } from 'vue';
import { UserFilled } from '@element-plus/icons-vue';
import { useStore } from '@/stores';
import { imgBaseUrl } from '@/api/authorization';
import { useLogout } from '@/utils';
import userInfoDialog from './user-info-dialog.vue';

const store = useStore();

const username = computed(() => store.userInfo.username);
const avatarUrl = computed(() => store.userInfo.avatar);

const showDialogBool = ref(false);
const showDialog = async () => { showDialogBool.value = true; };
const closeDialog = () => { showDialogBool.value = false; };

const menuList = [
	{
		icon: 'Avatar',
		desc: '个人设置',
		method: showDialog
	},
	{
		icon: 'CircleCloseFilled',
		desc: '退出登陆',
		method: useLogout
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
        <el-avatar
          v-if="avatarUrl"
          shape="square"
          :size="36"
          :src="`${imgBaseUrl}/${avatarUrl}`"
        />
        <el-avatar
          v-else
          shape="square"
          :size="36"
          :icon="UserFilled"
        />
        <span class="popover__username">{{ username }}</span>
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
      v-if="showDialogBool"
      :model-value="showDialogBool"
      @update:model-value="closeDialog"
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
