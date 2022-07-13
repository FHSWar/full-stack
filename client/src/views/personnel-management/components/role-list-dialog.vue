<script lang="ts" setup>
import { inject, ref } from 'vue';
import type { Ref } from 'vue';
import RoleList from './role-list.vue';

defineProps<{ title: string }>();
defineEmits(['fromChild']);

const dialogVisible = inject('dialogVisible') as Ref<boolean>;
const partialRoleList = ref([] as any);

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
    <role-list v-model="partialRoleList" />
    <template #footer>
      <el-button type="primary" @click="$emit('fromChild', partialRoleList)">
        确认
      </el-button>
    </template>
  </el-dialog>
</template>
