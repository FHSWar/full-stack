<script lang="ts" setup>
import { computed, provide, ref } from 'vue';
import { UserFilled } from '@element-plus/icons-vue';
import { useStore } from '@/stores';
import { imgBaseUrl } from '@/api/authorization';
import { useLogout } from '@/utils';
import PopoverOptions from './popover-options.vue';
import UserInfoDialog from './user-info-dialog.vue';

const store = useStore();

const username = computed(() => store.userInfo.username);
const avatarUrl = computed(() => store.userInfo.avatar);

const showDialogBool = ref(false);
const showDialog = async () => { showDialogBool.value = true; };
const closeDialog = () => { showDialogBool.value = false; };
provide('dialogVisible', showDialogBool);

const optionList = [
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
const triggerMethod = (method: () => void) => { method(); };
</script>

<template>
  <el-popover
    class="popover__wrapper"
    placement="bottom"
    trigger="click"
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
      </div>
    </template>
    <popover-options :options="optionList" @method="triggerMethod" />
  </el-popover>

  <span class="popover__username">{{ username }}</span>

  <Suspense>
    <!-- @update维护正确的现实状态-->
    <user-info-dialog @from-child="closeDialog" />
  </Suspense>
</template>

<style lang="scss" scoped>
.popover {
  &__avatar {
    display: flex;
    align-items: center;
  }

  &__username {
    text-indent: 0.5em;
  }
}
</style>
