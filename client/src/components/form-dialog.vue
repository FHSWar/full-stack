<script lang="ts" setup>
import { inject, reactive, ref } from 'vue';
import type { Ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

const emit = defineEmits(['update:modelValue', 'append']);

const dialogVisible = inject('dialogVisible') as Ref<boolean>;
const ruleForm = inject('ruleForm') as Ref<object>;
const rules = inject('rules') as Ref<ReturnType<typeof reactive<FormRules>>>;

const ruleFormRef = ref<FormInstance>();

const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid) {
			emit('append', ruleForm);
		} else {
			console.warn('error submit!', fields);
		}
	});
};

const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};

const closeDialog = () => { emit('update:modelValue'); };
</script>

<template>
  <el-dialog v-model="dialogVisible" draggable @close="closeDialog">
    <div class="configuration-dialog__wrapper">
      <el-form
        ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px"
        class="demo-ruleForm"
      >
        <slot />
        <el-form-item>
          <el-button @click="resetForm(ruleFormRef)">
            重置
          </el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            添加
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-select-dropdown__list) {
  display: flex;
  flex-wrap: wrap;
  width: 280px;
}

/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-select-dropdown__item) {
  padding: 0 20px;
}
</style>
