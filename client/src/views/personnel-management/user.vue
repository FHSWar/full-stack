<script lang="ts" setup>
import dayjs from 'dayjs';
import { provide, ref } from 'vue';
import { editUserRoles, getUserList, removeUser } from '@/api/personnel';
import type { FhsTableColumn } from '@/utils';
import FhsTable from '@/components/fhs-table/index.vue';
import RoleListDialog from '@/views/personnel-management/components/role-list-dialog.vue';

const userList = ref([] as any);
const partialRoleList = ref([] as any);
const userEditing = ref({}) as any;
const assignRoleDialogVisible = ref(false);
provide('dialogVisible', assignRoleDialogVisible);
provide('partialRoleArr', partialRoleList);

const columns: FhsTableColumn[] = [
	{ label: '用户名', prop: 'username', width: 120 },
	{ label: 'UM号', prop: 'um', width: 120, fixed: true },
	{ label: '角色', prop: 'roles' },
	{ label: '更新时间', prop: 'updatedAt', align: 'right', width: 120 },
	{ label: '创建时间', prop: 'createdAt', align: 'right', width: 120 },
	{
		label: '操作',
		align: 'center',
		buttons: [{ description: '编辑角色' }, { description: '删除', link: true, doubleCheck: true }],
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
		case '编辑角色':
			userEditing.value = row;
			partialRoleList.value = row.roles;
			assignRoleDialogVisible.value = true;
			break;
		case '预删除':
			userEditing.value = row;
			break;
		case '删除':
			await removeUser(userEditing.value);
			await getUsers();
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
  <main-div>
    <template #fillUp>
      <fhs-table
        :table-columns="columns"
        :table-data="userList"
        @button-click="handleButtonClick"
      />
    </template>

    <role-list-dialog
      v-model="assignRoleDialogVisible"
      :title="`${userEditing.um}角色`"
      @from-child="confirmEdit"
    />
  </main-div>
</template>
