<script lang="ts" setup>
import { ref } from 'vue';
import { getRoleList } from '@/api/personnel';
import { SPECIAL_ROLE } from '@/utils';
import MenuConfiguration from './menu-configuration.vue';
import IconTooltip from '@/views/personnel-management/components/icon-tooltip.vue';

const roleList = ref([]) as any;
const radioValue = ref(SPECIAL_ROLE);
const menuConfigurationRef = ref(null) as any;

const getRoles = async () => {
	const { list } = await getRoleList() as any;
	roleList.value = list.filter((item: { role: string; }) => item.role !== SPECIAL_ROLE);
};
const confirmEdit = () => { menuConfigurationRef.value.confirmEdit(); };

getRoles();
</script>

<template>
  <el-row class="menu-configuration__wrapper">
    <el-col :span="7" class="menu-configuration__left-panel">
      <div class="menu-configuration__header">
        <el-button type="primary" plain @click="confirmEdit">
          更新选中角色的菜单
        </el-button>
        <icon-tooltip>
          <div>
            {{ SPECIAL_ROLE }}可以拖拽、增删。<br>
            各角色基于{{ SPECIAL_ROLE }}做过滤，不可拖拽，增删。
          </div>
        </icon-tooltip>
      </div>
      <el-radio-group v-model="radioValue">
        <el-radio :label="SPECIAL_ROLE" size="large">
          {{ SPECIAL_ROLE }}
        </el-radio>
        <el-radio v-for="{ role } in roleList" :key="role" :label="role" size="large">
          {{ role }}
        </el-radio>
      </el-radio-group>
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

    .el-button {
      // https://blog.csdn.net/dongcehao/article/details/79655717
      align-self: baseline;
    }

    .el-radio-group {
      display: block;
    }

    .el-radio {
      display: flex;
      width: 100%;
      padding-left: 12px 0;
      border-radius: var(--el-border-radius-base);

      &:hover {
        background-color: var(--el-fill-color-light);
      }
    }

    /* stylelint-disable-next-line selector-class-pattern */
    :deep(.el-radio__inner) {
      margin-left: 12px;
    }
  }

  &__left-panel {
    display: flex;
    flex-direction: column;

    .el-radio-group {
      flex: 1;
      padding: 4px;
      margin-top: 4px;
      background-color: var(--el-fill-color-blank);
      border-radius: var(--el-border-radius-base);
    }
  }

  &__header {
    display: flex;
    align-items: center;
  }

  &__right-panel {
    padding: 4px;
    background-color: var(--el-fill-color-blank);
    border-radius: var(--el-border-radius-base);
  }
}
</style>
