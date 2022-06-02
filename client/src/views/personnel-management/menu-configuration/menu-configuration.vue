<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { cloneDeep } from 'lodash';
import type Node from 'element-plus/es/components/tree/src/model/node';
import { computed } from '@vue/reactivity';
import { fallbackRoutes, fallbackRoutesIdArr } from '@/router';
import { flattenMenuTree, SPECIAL_ROLE, trimMenuTree } from '@/utils';
import type { ExtendedMenuTreeItem, MenuTree } from '@/utils';
import { getRoutesByRole, updateRoutesByRole } from '@/api/personnel';
import ConfigurationDialog from './configuration-dialog.vue';
import DoubleCheckRemove from '@/components/double-check-remove.vue';

const props = defineProps<{role: string}>();

type MenuItem = {
    title: string;
    page: string;
    icon: string;
    insert: string;
    desc: string;
}

const activeNodeData = ref({} as Node['data']);
const activeNodeParentData = ref({} as Node['data']);
const isAll = computed(() => props.role === SPECIAL_ROLE);
const showDialogBool = ref(false);
const treeRef = ref(null) as any;

const closeDialog = () => { showDialogBool.value = false; };
const setCheckedByRole = async () => {
	if (!isAll.value) {
		try {
			const { routes } = await getRoutesByRole({ role: props.role }) as any;
			const parsedRoutes = JSON.parse(routes);
			const routeIdList = flattenMenuTree(parsedRoutes)
				.filter((item:ExtendedMenuTreeItem) => item.checked);
			treeRef.value.setCheckedNodes(routeIdList);
		} catch (e) {
			console.warn('请求对应角色路由出错', (e as Error).toString());
		}
	}
};
watchEffect(setCheckedByRole);

const dataSource = ref<MenuTree>([]);
const getMenu = async () => {
	try {
		const { routes } = await getRoutesByRole({ role: SPECIAL_ROLE }) as any;
		const remoteRoutes = JSON.parse(routes);
		dataSource.value = remoteRoutes;
	} catch (e) {
		console.warn('数据库无路由状态');
		dataSource.value = fallbackRoutes;
	}
};

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

const confirmRemove = (node: Node, data: ExtendedMenuTreeItem) => {
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

const handleCheckChange = (
	data: ExtendedMenuTreeItem,
	checked: boolean,
	indeterminate: boolean
) => {
	data.checked = checked;
	data.indeterminate = indeterminate;
};

const filterSelectedRoutes = () => {
	const wholeTree = cloneDeep(dataSource.value);
	// eslint-disable-next-line arrow-body-style
	const handler = (layer: ExtendedMenuTreeItem[]) => {
		return layer.filter((item) => {
			if (item.children.length !== 0) item.children = handler(item.children);
			return item.checked || item.indeterminate;
		});
	};

	return handler(wholeTree);
};

const confirmEdit = async () => {
	isAll.value
		? await updateRoutesByRole({ role: props.role, routes: trimMenuTree(dataSource.value) })
		: await updateRoutesByRole({ role: props.role, routes: filterSelectedRoutes() });
	await getMenu();
	setCheckedByRole();
};
defineExpose({ confirmEdit });

getMenu();
</script>

<script lang="ts">
export default {
	name: 'MenuConfiguration'
};
</script>

<template>
  <div class="tree__wrapper">
    <el-tree
      ref="treeRef"
      node-key="id"
      default-expand-all
      :draggable="isAll"
      :show-checkbox="!isAll"
      :data="dataSource"
      :expand-on-click-node="false"
      @check-change="handleCheckChange"
    >
      <template #default="{ node, data }">
        <span class="tree__node">
          <span>
            <use-icon v-if="data.icon" :icon="data.icon" />
            {{ data.title }}
          </span>
          <span v-if="isAll">
            <double-check-remove
              v-if="!fallbackRoutesIdArr.includes(data.id)"
              @confirm-remove="confirmRemove(node, data)"
            />
            <el-button @click="preAppend(node, data)">添加</el-button>
          </span>
        </span>
      </template>
    </el-tree>
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
        border-radius: var(--el-border-radius-base);
		overflow: hidden;
		height: 100%;
		background-color: var(--el-fill-color-blank);
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
}
:deep(.el-tree-node__content) {
	height: var(--el-component-size-large);
}
</style>
