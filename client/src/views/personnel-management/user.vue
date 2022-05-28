<script lang="ts" setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import { editUserRoles, getRoleList, getUserList, removeUser } from '@/api/personnel';
import type { FhsTableColumn } from '@/utils';
import FhsTable from '@/components/fhs-table.vue';

const userList = ref([] as any);
const roleList = ref([] as any);
const partialRoleList = ref([] as any);
const userEditing = ref({}) as any;
const showAssignRoleDialog = ref(false);

const columns: FhsTableColumn[] = [
	{ label: '用户名', prop: 'username', width: 120 },
	{ label: 'UM号', prop: 'um', width: 120 },
	{ label: '角色', prop: 'roles' },
	{ label: '更新时间', prop: 'updateTime', align: 'right', width: 120 },
	{ label: '创建时间', prop: 'createTime', align: 'right', width: 120 },
	{
		label: '操作',
		align: 'center',
		buttons: [{ description: '编辑' }, { description: '删除', link: true, doubleCheck: true }],
		width: 200
	}
];

const getRoles = async () => {
	const { list } = await getRoleList() as any;
	roleList.value = list;
};
const getUsers = async () => {
	const { list } = await getUserList() as any;
	userList.value = list.map((item: any) => {
		item.createTime = dayjs(item.createTime).format('YYYY-MM-DD');
		item.updateTime = dayjs(item.updateTime).format('YYYY-MM-DD');
		return item;
	});
};
const handleButtonClick = async (desc: string, row: any) => {
	switch (desc) {
		case '编辑':
			userEditing.value = row;
			partialRoleList.value = row.roles;
			showAssignRoleDialog.value = true;
			break;
		case '预删除':
			userEditing.value = row;
			break;
		case '删除':
			await removeUser(userEditing.value);
			getUsers();
			break;
		default:
			break;
	}
};
const confirmEdit = async () => {
	// 怪不得不用unref，.value就出来了
	await editUserRoles({
		...userEditing.value,
		roles: partialRoleList.value
	});
	showAssignRoleDialog.value = false;
	getUsers();
};

getRoles();
getUsers();
</script>

<template>
  <div>
    <fhs-table
      :table-columns="columns"
      :table-data="userList"
      @button-click="handleButtonClick"
    />
    <el-dialog
      ref="dialogEl"
      draggable
      center
      v-model="showAssignRoleDialog"
      :title="`${userEditing.um}角色`"
      width="33%"
    >
      <div class="dialog__wrapper">
        <el-select
          class="dialog__select"
          v-model="partialRoleList"
          multiple
          placeholder="Select"
        >
          <!--style="width: 240px;"-->
          <template v-for="item in roleList" :key="item.role">
            <el-tooltip
              placement="right"
              popper-class="dialog__tooltip--user"
              :content="item.description"
            >
              <el-option :label="item.role" :value="item.role" />
            </el-tooltip>
          </template>
        </el-select>
      </div>
      <template #footer>
        <el-button type="primary" @click="confirmEdit">
          确认
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.dialog {
	&__wrapper {
		display: flex;
		justify-content: center;

	}
	&__select {
		width: 100%;
	}
}
</style>

<!-- scoped内对tooptip的改动不生效，:(deep)也不行 -->
<style>
.dialog__tooltip--user {
	max-width: 400px;
}
</style>
