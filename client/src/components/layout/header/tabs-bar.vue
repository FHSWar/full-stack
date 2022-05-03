<script lang="ts" setup>
import { ref } from 'vue';

let tabIndex = 2;
const editableTabsValue = ref('2');
const editableTabs = ref([
	{
		title: 'Tab 1',
		name: '1',
		content: 'Tab 1 content'
	},
	{
		title: 'Tab 2',
		name: '2',
		content: 'Tab 2 content'
	}
]);

const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
	if (action === 'add') {
		const newTabName = `${++tabIndex}`;
		editableTabs.value.push({
			title: 'New Tab',
			name: newTabName,
			content: 'New Tab content'
		});
		editableTabsValue.value = newTabName;
	} else if (action === 'remove') {
		const tabs = editableTabs.value;
		let activeName = editableTabsValue.value;
		if (activeName === targetName) {
			tabs.forEach((tab, index) => {
				if (tab.name === targetName) {
					const nextTab = tabs[index + 1] || tabs[index - 1];
					if (nextTab) {
						activeName = nextTab.name;
					}
				}
			});
		}

		editableTabsValue.value = activeName;
		editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
	}
};
</script>

<template>
  <el-tabs
    v-model="editableTabsValue" type="card" closable class="tabs-bar__wrapper tabs-content"
    @edit="handleTabsEdit"
  >
    <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name" />
  </el-tabs>
</template>
<style lang="scss" scoped>
.tabs-bar {
    // 这一段改标签页样式的css是从vue-admin-better抄的
    &__wrapper {
        --tab-item-height: 32px;

        width: calc(100% - 90px);
        height: var(--tab-item-height);

        :deep {
            .el-tabs__nav-next, .el-tabs__nav-prev {
                height: var(--tab-item-height);
                line-height: var(--tab-item-height);
            }
            .el-tabs__header {
                border-bottom: 0;
                .el-tabs__nav {
                    border: 0;
                }
                .el-tabs__item {
                    height: var(--tab-item-height);
                    margin-right: 4px;
                    line-height: var(--tab-item-height);
                    border: var(--el-border);
                    border-radius: var(--el-border-radius-base);
                }
            }
        }
    }
}
</style>
