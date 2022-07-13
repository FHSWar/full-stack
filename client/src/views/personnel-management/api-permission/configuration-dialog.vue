<script lang="ts" setup>
import { provide, reactive } from 'vue';
import type { FormRules } from 'element-plus';
import FormDialog from '@/components/form-dialog.vue';

const ruleForm = reactive({
	title: ''
});
const rules = reactive<FormRules>({
	title: [
		{ required: true, message: '请输入菜单项标题', trigger: 'blur' },
		{ min: 2, max: 10, message: '标题应在二到十个字之间', trigger: 'blur' }
	]
});

provide('ruleForm', ruleForm);
provide('rules', rules);
</script>

<template>
  <form-dialog>
    <el-form-item label="接口标题" prop="title">
      <el-input placeholder="请输入接口标题" v-model="ruleForm.title" />
    </el-form-item>
  </form-dialog>
</template>
