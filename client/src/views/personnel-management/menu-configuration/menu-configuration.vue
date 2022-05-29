<script lang="ts" setup>
import { getCurrentInstance, ref, watchEffect } from 'vue';
import { cloneDeep } from 'lodash';
import type Node from 'element-plus/es/components/tree/src/model/node';
import { computed } from '@vue/reactivity';
import { fallbackRoutes, fallbackRoutesIdArr } from '@/router';
import { trimMenuTree } from '@/utils';
import type { MenuTree, ExtendedMenuTreeItem } from '@/utils';
import { getRoutesByRole, updateRoutesByRole } from '@/api/personnel';
import ConfigurationDialog from './configuration-dialog.vue';

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
const instance = ref(getCurrentInstance());
const isAll = computed(() => props.role === '所有菜单');
const showDialogBool = ref(false);
const treeRef = ref(null);
watchEffect(async () => {
	if (!isAll.value) {
		try {
			const { routes } = await getRoutesByRole({ role: props.role }) as any;
			console.log('role routes', routes);
		} catch (e) {
			console.warn('请求对应角色路由出错', (e as Error).toString());
		}
	}
});

const closeDialog = () => { showDialogBool.value = false; };

const dataSource = ref<MenuTree>([]);
const getMenu = async () => {
	try {
		const { routes } = await getRoutesByRole() as any;
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
const hidePopover = (title: string) => { (instance.value?.refs[`popoverRef${title}`] as any).hide(); };

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
		: await updateRoutesByRole({ role: props.role, routes: trimMenuTree(filterSelectedRoutes()) });
	getMenu();
};

getMenu();
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
              <el-popover
                v-if="!fallbackRoutesIdArr.includes(data.id)"
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
              <el-button @click="preAppend(node, data)">添加</el-button>
            </span>
          </span>
        </template>
      </el-tree>
    </div>
    <el-footer>
      <el-button type="primary" @click="filterSelectedRoutes">
        测试
      </el-button>
      <el-button type="primary" @click="confirmEdit">
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

		.is-link {
			padding: 8px 15px;
		}
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
