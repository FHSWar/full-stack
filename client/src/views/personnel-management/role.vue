<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import dayjs from 'dayjs';
import { addRole, editRole, getRoleList, removeRole } from '@/api/personnel';
import { SPECIAL_ROLE } from '@/utils';
import type { FhsTableColumn } from '@/utils';
import FhsTable from '@/components/fhs-table/index.vue';

const roleList = ref([] as any);
const tableData = ref([] as any[]);
const newRoleDialogVisible = ref(false);
const formRef = ref<FormInstance>();
const roleValidateForm = reactive({ role: '', description: '' });

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
				console.log('row', row);
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

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid) {
			newRoleDialogVisible.value = false;
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
  <div class="role__wrapper">
    <div class="role__header">
      <el-button type="primary" plain @click="newRoleDialogVisible = true">
        新增角色
      </el-button>
    </div>

    <fhs-table
      :table-columns="columns"
      :table-data="tableData"
      @button-click="handleButtonClick"
    />

    <el-dialog draggable v-model="newRoleDialogVisible" width="30%">
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
            autosize
            type="textarea"
            v-model.string="roleValidateForm.description"
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
.role {
  &__wrapper {
    .table {
      &__wrapper {
        margin-top: 16px;
      }
    }
  }

  &__header {
    display: flex;
    align-items: center;
  }
}

</style>
