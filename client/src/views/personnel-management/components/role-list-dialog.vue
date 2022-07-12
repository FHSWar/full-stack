<script lang="ts" setup>
/* eslint-disable vue-scoped-css/enforce-style-type */
import { inject, ref, watchEffect } from 'vue';
import type { Ref } from 'vue';
import { getRoleList } from '@/api/personnel';
import { SPECIAL_ROLE } from '@/utils';

const props = defineProps<{
    // 可选注入，超帅！
    haveInjection?: boolean
    title: string
}>();
defineEmits(['fromChild']);

const dialogVisible = inject('dialogVisible') as Ref<boolean>;
const partialRoleArr = props.haveInjection ? inject('partialRoleArr') as any : [];
const roleList = ref([] as any);
const partialRoleList = ref([] as any);

watchEffect(() => { partialRoleList.value = partialRoleArr?.value; });
watchEffect(async () => {
	// 解决弹窗没出现就请求接口的bug
	if (dialogVisible.value && roleList.value.length === 0) {
		const { list } = await getRoleList() as any;

		const arr = list.filter(({ role }:{role: string}) => role !== SPECIAL_ROLE);
		roleList.value = arr;
		//! !! 这里有大问题
		partialRoleList.value = arr
			.filter(({ isPermitted }:{isPermitted: boolean}) => isPermitted)
			.map(({ role }:{role: string}) => role);
	}
});

</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    ref="dialogEl"
    draggable
    center
    width="33%"
    :title="title"
  >
    <el-select
      class="dialog__select"
      v-model="partialRoleList"
      multiple
      placeholder="Select"
    >
      <template v-for="item in roleList" :key="item.role">
        <el-tooltip
          placement="right"
          popper-class="dialog__tooltip--user"
          :content="item.description"
        >
          <el-option :label="item.role" :value="item.role" />
        </el-tooltip>
      </template>
    </el-select>
    <template #footer>
      <el-button type="primary" @click="$emit('fromChild', partialRoleList)">
        确认
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.dialog {
  &__select {
    width: 100%;
  }
}
</style>

<!-- scoped内对tooptip的改动不生效，:(deep)也不行 -->
<style lang="scss">
.dialog {
  &__tooltip {
    &--user {
      max-width: 400px;
    }
  }
}
</style>
