<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import dayjs from 'dayjs';
import { addRole, editRole, getRoleList, removeRole } from '@/api/personnel';
import type { FhsTableColumn } from '@/utils';
import FhsTable from '@/components/fhs-table.vue';

const tableData = ref([] as any);
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
	tableData.value = list.map((item: any) => {
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

const dialogVisible = ref(false);

const formRef = ref<FormInstance>();
const roleValidateForm = reactive({
	role: '',
	description: ''
});

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid) {
			dialogVisible.value = false;
			await addRole(roleValidateForm);
			getList();
		} else {
			console.warn('error submit!');
			return false;
		}
	});
};
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};

getList();
</script>

<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">
      新增角色
    </el-button>

    <fhs-table
      :table-columns="columns"
      :table-data="tableData"
      @button-click="handleButtonClick"
    />

    <el-dialog v-model="dialogVisible" draggable>
      <el-form
        ref="formRef"
        label-width="100px"
        :model="roleValidateForm"
      >
        <el-form-item
          label="角色"
          prop="role"
          :rules="[
            { required: true, message: '角色是必须字段' },
            { type: 'string', message: '' },
          ]"
        >
          <el-input
            v-model.string="roleValidateForm.role"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="描述"
          prop="description"
          :rules="[
            { required: true, message: '描述是必须字段' },
            { type: 'string', message: '' },
          ]"
        >
          <el-input
            v-model.string="roleValidateForm.description"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm(formRef)">
            重置
          </el-button>
          <el-button type="primary" @click="submitForm(formRef)">
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.table {
  &__wrapper {
    margin-top: 16px;
  }
}
</style>
