<script lang="ts" setup>
import { inject, provide, reactive } from 'vue';
import type { Ref } from 'vue';
import type { FormRules } from 'element-plus';
import FormDialog from '@/components/form-dialog.vue';
import RoleList from '@/views/personnel-management/components/role-list.vue';

const options = inject('moduleArr') as Ref<string[]>;
const requestMethods = [
	{ description: '增--POST', value: 'POST' },
	{ description: '删--DELETE', value: 'DELETE' },
	{ description: '改--PATCH', value: 'PATCH' },
	{ description: '查--GET', value: 'GET' }
];

const ruleForm = reactive({
	apiRoute: '',
	belongModule: '',
	description: '',
	requestMethod: '',
	roles: [] as string[] // 管理员
});

const rules = reactive<FormRules>({
	belongModule: [{ type: 'string', required: true, message: '所属模块是必须字段' }],
	requestMethod: [{ type: 'string', required: true, message: '请求方式是必须字段' }],
	apiRoute: [{ type: 'string', required: true, message: '角色是必须字段' }],
	description: [{ type: 'string', required: true, message: '描述是必须字段' }],
	roles: [{ type: 'array', required: true, trigger: 'change', message: '有权角色是必须字段' }]
});

provide('partialRoleArr', ruleForm.roles);
provide('ruleForm', ruleForm);
provide('rules', rules);
</script>

<template>
  <form-dialog>
    <el-form-item label="所属模块" prop="belongModule">
      <el-select
        v-model="ruleForm.belongModule" allow-create filterable :reserve-keyword="false"
        placeholder="请选择或输入所属模块"
      >
        <el-option v-for="item in options" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="请求方式" prop="requestMethod">
      <el-select
        v-model="ruleForm.requestMethod" :reserve-keyword="false"
        placeholder="请选择请求接口方式"
      >
        <el-option
          v-for="{description, value} in requestMethods"
          :key="description" :label="description"
          :value="value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="接口路径" prop="apiRoute">
      <el-input
        v-model="ruleForm.apiRoute" type="text" autocomplete="off"
        placeholder="请输入接口路径"
      />
    </el-form-item>
    <el-form-item label="接口作用描述" prop="description">
      <el-input
        v-model="ruleForm.description" autosize type="textarea" autocomplete="off"
        placeholder="请描述接口作用"
      />
    </el-form-item>
    <el-form-item label="有权限的角色" prop="roles">
      <!-- 自定义v-model的使用，还挺好用 -->
      <role-list v-model="ruleForm.roles" />
    </el-form-item>
  </form-dialog>
</template>
