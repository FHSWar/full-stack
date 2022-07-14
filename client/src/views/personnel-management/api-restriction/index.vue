<script lang="ts" setup>
import dayjs from 'dayjs';
import { provide, ref, watchEffect } from 'vue';
import {
	addRestrictedApi,
	getRestrictedApiList,
	getRestrictedApiModule,
	removeRestrictedApi,
	updateRestrictedApi
} from '@/api/personnel';
import type { ApiRestriction } from '@/api/personnel';
import FhsTable from '@/components/fhs-table/index.vue';
import type { FhsTableColumn } from '@/utils';
import RoleListDialog from '@/views/personnel-management/components/role-list-dialog.vue';
import ConfigurationDialog from './configuration-dialog.vue';

const apiEditing = ref<ApiRestriction>();
const assignRoleDialogVisible = ref(false);
const modules = ref<string[]>();
const roles = ref<string[]>();
const tableData = ref([] as any[]);
const columns: FhsTableColumn[] = [
	{ editable: true, label: '所属模块', prop: 'belongModule', width: 120 },
	{ label: '请求方式', prop: 'requestMethod', width: 100 },
	{ label: '接口路径', prop: 'apiRoute' },
	{ label: '授权角色', prop: 'roles' },
	{ editable: true, label: '描述', prop: 'description' },
	{ label: '更新时间', prop: 'updatedAt', align: 'right', width: 120 },
	{
		label: '操作',
		align: 'center',
		buttons: [
			{ description: '编辑角色', type: 'primary' },
			{ description: '编辑描述', isEditButton: true },
			{ description: '删除', link: true, doubleCheck: true }
		],
		width: 300
	}
];
const getData = async () => {
	const { list } = await getRestrictedApiList() as { list: any };

	tableData.value = list.map((item: any) => {
		item.updatedAt = dayjs(item.updatedAt).format('YYYY-MM-DD');
		return item;
	});
};
const confirmEdit = async () => {
	assignRoleDialogVisible.value = false;

	await updateRestrictedApi({
		...apiEditing.value as ApiRestriction,
		roles: roles.value as string[]
	});
	await getData();
};
const handleButtonClick = async (desc: string, row: any) => {
	switch (desc) {
		case '编辑角色':
			apiEditing.value = row;
			roles.value = row.roles;
			assignRoleDialogVisible.value = true;
			break;
		case '编辑描述':
			apiEditing.value = row;
			if (!row.editing) row.editing = true;
			else {
				row.editing = false;

				await confirmEdit();
			}
			break;
		case '删除':
			await removeRestrictedApi(row);
			await getData();
			break;
		default:
			break;
	}
};

const showDialogBool = ref(false);
const addApiRestriction = () => { showDialogBool.value = true; };
const append = async (ruleForm: any) => {
	showDialogBool.value = false;

	await addRestrictedApi(ruleForm);
	await getData();
};
const closeDialog = () => { showDialogBool.value = false; };

watchEffect(async () => {
	if (showDialogBool.value === true) {
		const { list } = await getRestrictedApiModule() as any;

		modules.value = list;
	}
});

getData();

provide('dialogVisible', showDialogBool);
provide('moduleArr', modules);
provide('partialRoleArr', roles);
</script>

<template>
  <div>
    <el-button type="primary" plain @click="addApiRestriction">
      新增需鉴权接口
    </el-button>

    <fhs-table :table-columns="columns" :table-data="tableData" @button-click="handleButtonClick" />

    <configuration-dialog @append="append" @update:model-value="closeDialog" />

    <role-list-dialog
      v-model="assignRoleDialogVisible"
      :title="`接口：${apiEditing?.apiRoute}`"
      @from-child="confirmEdit"
    />
  </div>
</template>

<style lang="scss" scoped>
.table {
  &__wrapper {
    margin-top: 16px;
  }
}
</style>
