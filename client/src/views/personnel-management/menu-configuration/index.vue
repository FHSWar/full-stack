<script lang="ts" setup>
import { ref } from 'vue';
import { getRoleList } from '@/api/personnel';
import MenuConfiguration from './menu-configuration.vue';

const roleList = ref([]) as any;
const radioValue = ref('所有菜单');
const menuConfigurationRef = ref(null) as any;

const getRoles = async () => {
	const { list } = await getRoleList() as any;
	roleList.value = list.filter((item: { role: string; }) => item.role !== '所有菜单');
};
const confirmEdit = () => { menuConfigurationRef.value.confirmEdit(); };

getRoles();
</script>

<template>
  <el-row class="menu-configuration__wrapper">
    <el-col :span="7" class="menu-configuration__left-panel">
      <el-radio-group v-model="radioValue">
        <el-radio label="所有菜单" size="large">
          所有菜单
        </el-radio>
        <el-radio v-for="{ role } in roleList" :key="role" :label="role" size="large">
          {{ role }}
        </el-radio>
      </el-radio-group>
      <el-footer>
        <el-button type="primary" @click="confirmEdit">
          确定
        </el-button>
      </el-footer>
    </el-col>
    <el-col :span="1" />
    <el-col :span="16" class="menu-configuration__right-panel">
      <menu-configuration ref="menuConfigurationRef" :role="radioValue" />
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.menu-configuration {
	&__wrapper {
		height: 100%;

		.el-radio-group {
			display: block;
		}

		.el-radio {
			display: flex;
			border-radius: var(--el-border-radius-base);
			width: 100%;
			padding-left: 12px 0;

			&:hover {
				background-color: var(--el-fill-color-light);
			}
		}

		.el-footer {
			display: flex;
			justify-content: flex-end;
		}

		:deep(.el-radio__inner) {
			margin-left: 12px;
		}
	}

	&__left-panel {
		display: flex;
		flex-direction: column;
		border-radius: var(--el-border-radius-base);
		padding: 4px;
		background-color: var(--el-fill-color-blank);

		.el-radio-group {
			flex: 1;
		}
	}

	&__right-panel {
		border-radius: var(--el-border-radius-base);
		padding: 4px;
		background-color: var(--el-fill-color-blank);
	}
}
</style>
