<script lang="ts" setup>
import { provide, ref } from 'vue';
import dayjs from 'dayjs';
import { editUserRoles, getUserList, removeUser } from '@/api/personnel';
import type { FhsTableColumn } from '@/utils';
import FhsTable from '@/components/fhs-table/index.vue';
import RoleListDialog from './role-list-dialog.vue';

const userList = ref([] as any);
const partialRoleList = ref([] as any);
const userEditing = ref({}) as any;
const assignRoleDialogVisible = ref(false);
provide('partialRoleArr', partialRoleList);

const columns: FhsTableColumn[] = [
	{ label: '用户名', prop: 'username', width: 120 },
	{ label: 'UM号', prop: 'um', width: 120 },
	{ label: '角色', prop: 'roles' },
	{ label: '更新时间', prop: 'updatedAt', align: 'right', width: 120 },
	{ label: '创建时间', prop: 'createdAt', align: 'right', width: 120 },
	{
		label: '操作',
		align: 'center',
		buttons: [{ description: '编辑' }, { description: '删除', link: true, doubleCheck: true }],
		width: 200
	}
];

const getUsers = async () => {
	const { list } = await getUserList() as any;
	userList.value = list.map((item: any) => {
		item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD');
		item.updatedAt = dayjs(item.updatedAt).format('YYYY-MM-DD');
		return item;
	});
};
const handleButtonClick = async (desc: string, row: any) => {
	switch (desc) {
		case '编辑':
			userEditing.value = row;
			partialRoleList.value = row.roles;
			assignRoleDialogVisible.value = true;
			break;
		case '预删除':
			userEditing.value = row;
			break;
		case '删除':
			await removeUser(userEditing.value);
			getUsers();
			break;
		default:
			break;
	}
};
const confirmEdit = async (roles: string[]) => {
	// 怪不得不用unref，.value就出来了
	await editUserRoles({ ...userEditing.value, roles });

	assignRoleDialogVisible.value = false;
	getUsers();
};
getUsers();
</script>

<template>
  <div>
    <fhs-table
      :table-columns="columns"
      :table-data="userList"
      @button-click="handleButtonClick"
    />

    <suspense>
      <role-list-dialog
        :have-injection="true"
        :title="`${userEditing.um}角色`"
        :model-value="assignRoleDialogVisible"
        @update:model-value="assignRoleDialogVisible = false"
        @from-child="confirmEdit"
      />
    </suspense>
  </div>
</template>
