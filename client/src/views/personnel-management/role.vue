<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import dayjs from 'dayjs';
import { addRole, editRole, getRoleList, removeRole } from '@/api/personnel';
import DoubleCheckRemove from '@/components/double-check-remove.vue';

const tableData = ref([] as any);

const getList = async () => {
	const { list } = await getRoleList() as any;
	tableData.value = list.map((item: any) => {
		item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD');
		item.editable = false;
		return item;
	});
};

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

    <el-table class="table__wrapper" stripe :data="tableData">
      <el-table-column prop="role" label="角色" width="160" />
      <el-table-column prop="description" label="描述">
        <template #default="scope">
          <el-input
            autosize
            type="textarea"
            v-model="scope.row.description"
            :disabled="!scope.row.editable"
          />
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="添加日期" width="120" align="right" />
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template #default="scope">
          <el-button @click.prevent="editRow(scope.row)">
            {{ scope.row.editable ? '确认':'编辑' }}
          </el-button>
          <double-check-remove
            v-if="scope.row.role !== '访客'"
            @confirm-remove="removeRow(scope.row)"
          >
            <el-button link>
              移除
            </el-button>
          </double-check-remove>
        </template>
      </el-table-column>
    </el-table>

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
