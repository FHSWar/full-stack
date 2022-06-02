<script lang="ts" setup>
import { inject, ref, watchEffect } from 'vue';
import { getRoleList } from '@/api/personnel';
import { SPECIAL_ROLE } from '@/utils';

const props = defineProps<{
    // 可选注入，超帅！
    haveInjection?: boolean
    title: string
}>();
defineEmits(['fromChild']);

const partialRoleArr = props.haveInjection ? inject('partialRoleArr') as any : [];
const roleList = ref([] as any);
const partialRoleList = ref([] as any);
watchEffect(() => { partialRoleList.value = partialRoleArr?.value; });

const { list } = await getRoleList() as any;

const arr = list.filter(({ role }:{role: string}) => role !== SPECIAL_ROLE);
roleList.value = arr;

partialRoleList.value = arr
	.filter(({ isPermitted }:{isPermitted: boolean}) => isPermitted)
	.map(({ role }:{role: string}) => role);
</script>

<template>
  <el-dialog
    ref="dialogEl"
    draggable
    center
    :title="title"
    width="33%"
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
<style>
.dialog__tooltip--user {
	max-width: 400px;
}
</style>
