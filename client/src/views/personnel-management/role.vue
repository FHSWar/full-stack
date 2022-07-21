<script lang="ts" setup>
import { provide, reactive, ref } from 'vue';
import type { FormRules } from 'element-plus';
import dayjs from 'dayjs';
import { addRole, editRole, getRoleList, removeRole } from '@/api/personnel';
import { SPECIAL_ROLE } from '@/utils';
import type { FhsTableColumn } from '@/utils';
import FhsTable from '@/components/fhs-table/index.vue';
import FormDialog from '@/components/form-dialog.vue';

const roleList = ref([] as any);
const tableData = ref([] as any[]);

const columns: FhsTableColumn[] = [
	{ label: '角色', prop: 'role', width: 160 },
	{ editable: true, label: '描述', prop: 'description' },
	{ label: '更新时间', prop: 'updatedAt', align: 'right', width: 120 },
	{ label: '创建时间', prop: 'createdAt', align: 'right', width: 120 },
	{
		label: '操作',
		align: 'center',
		buttons: [{ description: '编辑' }, { description: '删除', link: true, doubleCheck: true }],
		width: 200
	}
];

const getList = async () => {
	const { list } = await getRoleList() as any;
	const arr = list.filter((item: any) => item.role !== SPECIAL_ROLE);

	roleList.value = arr;
	tableData.value = arr.map((item: any) => {
		item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD');
		item.updatedAt = dayjs(item.updatedAt).format('YYYY-MM-DD');
		item.editable = false;
		return item;
	});
};

const handleButtonClick = async (desc: string, row: any) => {
	switch (desc) {
		case '编辑':
			if (!row.editing) row.editing = true;
			else {
				await editRole(row);

				row.editing = false;
			}
			break;
		case '删除':
			await removeRole(row);
			getList();
			break;
		default:
			break;
	}
};

const ruleForm = reactive({
	role: '',
	description: ''
});
const rules = reactive<FormRules>({
	role: [{ type: 'string', required: true, message: '角色是必须字段' }],
	description: [{ type: 'string', required: true, message: '描述是必须字段' }]
});
const showDialogBool = ref(false);

const append = async () => {
	await addRole(ruleForm);
	showDialogBool.value = false;
	getList();
};
const closeDialog = () => { showDialogBool.value = false; };

getList();

provide('dialogVisible', showDialogBool);
provide('ruleForm', ruleForm);
provide('rules', rules);
</script>

<template>
  <main-div>
    <el-button type="primary" plain @click="showDialogBool = true">
      新增角色
    </el-button>
    <template #fillUp>
      <fhs-table :table-columns="columns" :table-data="tableData" @button-click="handleButtonClick" />
    </template>
    <form-dialog @append="append" @update:model-value="closeDialog">
      <el-form-item label="角色名称" prop="role">
        <el-input v-model="ruleForm.role" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input autosize type="textarea" v-model="ruleForm.description" autocomplete="off" />
      </el-form-item>
    </form-dialog>
  </main-div>
</template>

<style lang="scss" scoped>
.table {
  &__wrapper {
    margin-top: 16px;
  }
}
</style>
