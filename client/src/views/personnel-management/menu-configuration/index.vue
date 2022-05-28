<script lang="ts" setup>
import { ref } from 'vue';
import { getRoleList } from '@/api/personnel';
import MenuConfiguration from './menu-configuration.vue';

const roleList = ref([]) as any;
const radioValue = ref('admin');

const getRoles = async () => {
	const { list } = await getRoleList() as any;
	roleList.value = list;
};

getRoles();
</script>

<template>
  <el-row class="menu-configuration__wrapper">
    <el-col :span="7" class="menu-configuration__left-panel">
      <el-radio-group v-model="radioValue">
        <el-radio v-for="{role} in roleList" :key="role" :label="role" size="large">
          {{ role }}
        </el-radio>
      </el-radio-group>
    </el-col>
    <el-col :span="1" />
    <el-col :span="16" class="menu-configuration__right-panel">
      <menu-configuration :role="radioValue" />
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
        :deep(.el-radio__inner) {
            margin-left: 12px;
        }
    }
    &__left-panel {
        border-radius: var(--el-border-radius-base);
        padding: 4px;
        background-color: var(--el-fill-color-blank);
    }
    &__right-panel {
        border-radius: var(--el-border-radius-base);
        padding: 4px;
        background-color:  var(--el-fill-color-blank);
    }
}
</style>
