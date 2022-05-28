<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue';
import type Node from 'element-plus/es/components/tree/src/model/node';
import type { MenuTree } from '@/utils';
import { updateRoutes } from '@/api/personnel';
import ConfigurationDialog from './configuration-dialog.vue';

defineProps<{role: string}>();

type MenuItem = {
    title: string;
    page: string;
    icon: string;
    insert: string;
    desc: string;
}
const showDialogBool = ref(false);
const activeNodeData = ref({} as Node['data']);
const activeNodeParentData = ref({} as Node['data']);
const instance = ref(getCurrentInstance());
const closeDialog = () => { showDialogBool.value = false; };

const dataSource = ref<MenuTree>([
	{
		icon: 'HomeFilled',
		id: '99',
		page: 'home',
		pid: '',
		title: '首页',
		children: []
	},
	{
		id: '100',
		pid: '',
		title: '权限配置',
		icon: 'SetUp',
		children: [
			{ id: '101', page: 'role', pid: '100', title: '角色', icon: 'User', children: [] },
			{ id: '102', page: 'user', pid: '100', title: '用户', icon: 'UserFilled', children: [] },
			{ id: '103', page: 'menu', pid: '100', title: '菜单', icon: 'Rank', children: [] }
		]
	}
]);

const preAppend = (node: Node, data: MenuTree) => {
	activeNodeData.value = data;
	activeNodeParentData.value = node.parent.data;
	showDialogBool.value = true;
};
const append = (newMenuItem: MenuItem) => {
	const { desc, icon, insert, page, title } = newMenuItem;
	const id = `${Date.now()}-${Math.random()}`;
	const parent = activeNodeParentData.value;
	const isFirstLayer = Array.isArray(parent);
	const pid = isFirstLayer ? '' : parent.id;
	const self = activeNodeData.value;

	const menuItem = { children: [], desc, icon, id, page, pid, title };

	switch (insert) {
		case '同层级':
			if (isFirstLayer) parent.push(menuItem);
			else parent.children.push(menuItem);
			break;
		case '子层级':
			self.children.push(menuItem);
			break;
		default:
			throw new Error('请刷新');
	}
	showDialogBool.value = false;
};

const confirmRemove = (node: Node, data: MenuTree[0]) => {
	const parent = node.parent.data;
	const isFirstLayer = Array.isArray(parent);

	if (isFirstLayer) {
		const targetIndex = parent.findIndex((item) => item.id === data.id);
		parent.splice(targetIndex, 1);
		return;
	}

	const targetIndex = parent.children.findIndex((item: MenuTree[0]) => item.id === data.id);
	parent.children.splice(targetIndex, 1);
};
const hidePopover = (title: string) => { (instance.value?.refs[`popoverRef${title}`] as any).hide(); };
</script>

<script lang="ts">
export default {
	name: 'MenuConfiguration'
};
</script>

<template>
  <div class="tree__wrapper">
    <div class="tree__container">
      <el-tree
        :data="dataSource"
        draggable
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <template #default="{ node, data }">
          <span class="tree__node">
            <span>
              <use-icon v-if="data.icon" :icon="data.icon" />
              {{ data.title }}
            </span>
            <span>
              <el-button @click="preAppend(node, data)">添加</el-button>
              <el-popover
                placement="top"
                trigger="click"
                :ref="`popoverRef${data.title}`"
              >
                <template #reference>
                  <el-button link>移除</el-button>
                </template>
                <!-- 删除的确定 -->
                <div class="tree__double-check">
                  <el-button type="danger" @click="confirmRemove(node, data)">
                    删除
                  </el-button>
                  <el-button @click="hidePopover(data.title)">
                    取消
                  </el-button>
                </div>
              </el-popover>

            </span>
          </span>
        </template>
      </el-tree>
    </div>
    <el-footer>
      <el-button type="primary" @click="updateRoutes({role, routes: dataSource})">
        确定
      </el-button>
    </el-footer>
    <configuration-dialog
      v-if="showDialogBool"
      :model-value="showDialogBool"
      @append="append"
      @update:model-value="closeDialog"
    />
  </div>
</template>

<style lang="scss" scoped>
.tree {
	&__wrapper {
		display: flex;
		flex-direction: column;
        border-radius: var(--el-border-radius-base);
		overflow: hidden;
		height: 100%;
		background-color: var(--el-fill-color-blank);

		.el-footer {
			display: flex;
			justify-content: flex-end;
		}
	}
	&__container {
		flex: 1;
	}
	&__node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 24px;
		font-size: 14px;

		.el-icon {
			position: relative;
			top: 1.5px;
		}
	}
	&__double-check {
		display: flex;
		justify-content: space-between;
	}
}
:deep(.el-tree-node__content) {
	height: var(--el-component-size-large);
}
</style>
