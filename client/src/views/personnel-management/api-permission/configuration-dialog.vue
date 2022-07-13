<script lang="ts" setup>
import { provide, reactive } from 'vue';
import type { FormRules } from 'element-plus';
import FormDialog from '@/components/form-dialog.vue';
import RoleList from '@/views/personnel-management/components/role-list.vue';

const options = ['权限配置'];

const ruleForm = reactive({
	apiRoute: '',
	belongModule: '',
	description: '',
	roles: ['管理员'] as Array<string>
});

const rules = reactive<FormRules>({
	belongModule: [{ type: 'string', required: true, message: '所属模块是必须字段' }],
	apiRoute: [{ type: 'string', required: true, message: '角色是必须字段' }],
	description: [{ type: 'string', required: true, message: '描述是必须字段' }],
	roles: [{ type: 'array', required: true, message: '有权角色是必须字段' }]
});

provide('partialRoleArr', ruleForm.roles);
provide('ruleForm', ruleForm);
provide('rules', rules);
</script>

<template>
  <form-dialog>
    <el-form-item label="所属模块" prop="belongModule">
      <el-select
        allow-create
        filterable
        :reserve-keyword="false"
        v-model="ruleForm.belongModule"
        placeholder="请选择或输入所属模块"
      >
        <el-option v-for="item in options" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="接口路径" prop="apiRoute">
      <el-input v-model="ruleForm.apiRoute" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="接口作用描述" prop="description">
      <el-input autosize type="textarea" v-model="ruleForm.description" autocomplete="off" />
    </el-form-item>
    <el-form-item label="接口作用描述" prop="roles">
      <!-- 自定义v-model的使用，还挺好用 -->
      <role-list v-model="ruleForm.roles" />
    </el-form-item>
  </form-dialog>
</template>
