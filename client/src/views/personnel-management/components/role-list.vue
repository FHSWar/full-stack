<script lang="ts" setup>
/* eslint-disable vue-scoped-css/enforce-style-type */
import { inject, ref, watchEffect } from 'vue';
import { getRoleList } from '@/api/personnel';
import { SPECIAL_ROLE } from '@/utils';

/* const props = defineProps<{
    // 可选注入，超帅！
    haveInjection?: boolean
}>(); */

const emit = defineEmits(['update:modelValue']);

const partialRoleArr = inject('partialRoleArr') as any;

const partialRoleList = ref([] as any);
const roleList = ref([] as any);
const getList = async () => {
	const { list } = await getRoleList() as any;

	const arr = list.filter(({ role }:{role: string}) => role !== SPECIAL_ROLE);
	roleList.value = arr;
};

// 注入的partialRoleArr可能是ref的也可能是reactive的属性，于是或运算一个
watchEffect(() => { partialRoleList.value = partialRoleArr?.value || partialRoleArr; });
watchEffect(() => { emit('update:modelValue', partialRoleList.value); });

getList();
</script>

<template>
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
