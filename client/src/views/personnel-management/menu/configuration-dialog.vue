<script lang="ts" setup>
import { provide, reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { FormRules } from 'element-plus';
import { iconNameArr } from '@/components/use-icon';
import FormDialog from '@/components/form-dialog.vue';

const pageNameArr = useRouter()
	.getRoutes()
	.map((route) => route.name)
	.filter((routeName) => routeName);

const ruleForm = reactive({
	showBool: true,
	title: '',
	page: '',
	icon: '',
	insert: '',
	desc: ''
});
const rules = reactive<FormRules>({
	title: [
		{ required: true, message: '请输入菜单项标题', trigger: 'blur' },
		{ min: 2, max: 10, message: '标题应在二到十个字之间', trigger: 'blur' }
	],
	icon: [{ message: '菜单项图标', trigger: 'change' }],
	page: [{ message: '菜单项图标', trigger: 'change' }],
	insert: [
		{
			type: 'string',
			required: true,
			message: '添加位置是必选项',
			trigger: 'change'
		}
	]
});

provide('ruleForm', ruleForm);
provide('rules', rules);
</script>

<template>
  <form-dialog>
    <el-form-item label="显示在侧边栏" prop="showBool">
      <el-switch
        v-model="ruleForm.showBool"
        inline-prompt
        active-text="是"
        inactive-text="否"
      />
    </el-form-item>
    <el-form-item label="添加位置" prop="insert">
      <el-radio-group v-model="ruleForm.insert">
        <el-radio label="同层级" name="insert" />
        <el-radio label="子层级" name="insert" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="菜单项标题" prop="title">
      <el-input placeholder="请输入菜单项标题" v-model="ruleForm.title" />
    </el-form-item>
    <el-form-item label="菜单项图标" prop="icon">
      <el-select
        filterable
        allow-create
        placeholder="图标名称"
        v-model="ruleForm.icon"
        :teleported="false"
      >
        <el-option
          v-for="iconName in iconNameArr"
          :key="iconName"
          :label="iconName"
          :value="iconName"
        >
          <use-icon :icon="iconName" />
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="菜单项页面" prop="page">
      <el-select
        filterable
        allow-create
        placeholder="跳转的页面"
        v-model="ruleForm.page"
        :teleported="false"
      >
        <el-option
          v-for="pageName in pageNameArr"
          :key="pageName"
          :label="(pageName as string)"
          :value="(pageName as string)"
        >
          {{ pageName }}
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="页面功能描述" prop="desc">
      <el-input v-model="ruleForm.desc" type="textarea" />
    </el-form-item>
  </form-dialog>
</template>
