<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import dayjs from 'dayjs';
import { addRole, editRole, getRoleList, removeRole } from '@/api/personnel';

const tableData = ref([] as any);
const getList = async () => {
	const { data } = await getRoleList() as any;
	tableData.value = data.map((item: any) => {
		item.createTime = dayjs(item.createTime).format('YYYY-MM-DD');
		item.editable = false;
		return item;
	});
};
getList();

const editRow = async (row: any) => {
	if (row.editable === false) row.editable = true;
	else {
		await editRole(row);
		row.editable = false;
	}
};
const removeRow = async (row: any) => {
	await removeRole(row);
	getList();
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
			console.log('error submit!');
			return false;
		}
	});
};
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};
</script>

<template>
  <el-button type="primary" @click="dialogVisible = true">
    新增角色
  </el-button>

  <el-table class="table__wrapper" stripe :data="tableData">
    <el-table-column prop="role" label="角色" width="160" />
    <el-table-column prop="description" label="描述">
      <template #default="scope">
        <el-input v-model="scope.row.description" :disabled="!scope.row.editable" />
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="添加日期" width="120" align="right" />
    <el-table-column fixed="right" label="操作" width="200" align="center">
      <template #default="scope">
        <el-button @click.prevent="editRow(scope.row)">
          {{ scope.row.editable ? '确认':'编辑' }}
        </el-button>
        <el-button @click.prevent="removeRow(scope.row)">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" draggable>
    <el-form
      ref="formRef"
      :model="roleValidateForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="角色"
        prop="role"
        :rules="[
          { required: true, message: 'role is required' },
          { type: 'string', message: 'role must be a number' },
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
          { required: true, message: 'description is required' },
          { type: 'string', message: 'description must be a number' },
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
</template>

<style lang="scss" scoped>
.table {
  &__wrapper {
    margin-top: 16px;
  }
}
</style>
