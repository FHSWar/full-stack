<script lang="ts" setup>
import { ref } from 'vue';
import type Node from 'element-plus/es/components/tree/src/model/node';

interface Tree {
  id: number
  label: string
  children?: Tree[]
}
let id = 1000;

const dataSource = ref<Tree[]>([
	{
		id: 1,
		label: '层级1',
		children: [
			{
				id: 4,
				label: '层级1-1',
				children: [{ id: 9, label: '层级1-1-1' }]
			}
		]
	},
	{
		id: 2,
		label: '层级2',
		children: [
			{ id: 5, label: '层级2-1' },
			{ id: 6, label: '层级2-2' }
		]
	}
]);
const append = (data: Tree) => {
	const newChild = { id: id++, label: 'testtest', children: [] };
	if (!data.children) {
		data.children = [];
	}
	data.children.push(newChild);
	dataSource.value = [...dataSource.value];
};

const remove = (node: Node, data: Tree) => {
	const parent = node.parent;
	const children: Tree[] = parent.data.children || parent.data;
	const index = children.findIndex((d) => d.id === data.id);
	children.splice(index, 1);
	dataSource.value = [...dataSource.value];
};
</script>

<script lang="ts">
export default {
	name: 'MenuConfiguration'
};
</script>

<template>
  <div class="tree__wrapper">
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
          <span>{{ node.label }}</span>
          <span>
            <el-button @click="append(data)">添加</el-button>
            <el-button link @click="remove(node, data)">移除</el-button>
          </span>
        </span>
      </template>
    </el-tree>
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
		padding-right: 8px;
		font-size: 14px;
	}
}
:deep(.el-tree-node__content) {
	height: var(--el-component-size-large);
}
</style>
