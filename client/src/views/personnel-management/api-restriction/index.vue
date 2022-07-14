<script lang="ts" setup>
import dayjs from 'dayjs';
import { provide, ref } from 'vue';
import { addRestrictedApi, getRestrictedApiList } from '@/api/personnel';
import type { FhsTableColumn } from '@/utils';
import FhsTable from '@/components/fhs-table/index.vue';
import ConfigurationDialog from './configuration-dialog.vue';

const tableData = ref([] as any[]);
const columns: FhsTableColumn[] = [
	{ label: '接口路径', prop: 'apiRoute', width: 160 },
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
		]
	}
];
const getData = async () => {
	const { list } = await getRestrictedApiList() as { list: any };

	tableData.value = list.map((item: any) => {
		item.updatedAt = dayjs(item.updatedAt).format('YYYY-MM-DD');
		return item;
	});
};
const handleButtonClick = async (desc: string, row: any) => {
	switch (desc) {
		case '编辑角色':
			console.log('编辑角色来一个！');
			break;
		case '编辑描述':
			if (!row.editing) row.editing = true;
			else {
				console.log('row', row);
				row.editing = false;
			}
			break;
		case '删除':
			console.log('删除删除');
			break;
		default:
			break;
	}
};

const showDialogBool = ref(false);
provide('dialogVisible', showDialogBool);
const addApiPermission = () => { showDialogBool.value = true; };
const append = async (ruleForm: any) => {
	showDialogBool.value = false;
	await addRestrictedApi(ruleForm);
};
const closeDialog = () => { showDialogBool.value = false; };

getData();
</script>

<template>
  <div>
    <el-button type="primary" plain @click="addApiPermission">
      新增需鉴权接口
    </el-button>

    <fhs-table :table-columns="columns" :table-data="tableData" @button-click="handleButtonClick" />

    <configuration-dialog @append="append" @update:model-value="closeDialog" />
  </div>
</template>
