<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { computed, nextTick, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/stores';
import { constantRoutes } from '@/router/constant';
import { setLocal } from '@/utils';

const store = useStore();

const showBreadcrumb = ref(true);
const breadcrumb = computed(() => {
	if (store.breadcrumb.length > 0) return store.breadcrumb;
	return constantRoutes;
});
watch(breadcrumb, async () => {
	showBreadcrumb.value = false;
	await nextTick();
	showBreadcrumb.value = true;
});

const router = useRouter();
const logout = () => {
	router.push({ name: 'login' });
	setLocal('token', '');
};
</script>

<template>
  <div class="breadcrumb__wrapper">
    <el-breadcrumb class="breadcrumb__main" :separator-icon="ArrowRight">
      <template v-for="{icon, id, page, title} in breadcrumb" :key="id">
        <transition name="el-fade-in">
          <el-breadcrumb-item v-if="page" :to="{ name: page }" v-show="showBreadcrumb">
            <use-icon v-if="icon" :icon="icon" />
            {{ title }}
          </el-breadcrumb-item>
          <el-breadcrumb-item v-else v-show="showBreadcrumb">
            <use-icon v-if="icon" :icon="icon" />
            {{ title }}
          </el-breadcrumb-item>
        </transition>
      </template>
    </el-breadcrumb>
    <el-popover
      placement="bottom"
      trigger="hover"
      :offset="-1"
      :show-arrow="false"
      :width="200"
    >
      <template #reference>
        <div>123</div>
      </template>
      <div class="breadcrumb__popover">
        <p class="breadcrumb__popover-item" @click="logout">
          <use-icon icon="CircleCloseFilled" />
          <span class="breadcrumb__popover-desc">退出登陆</span>
        </p>
      </div>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
  &__wrapper {
    display: flex;
  }
  &__main {
    width: calc(100% - 100px);
    line-height: var(--el-header-height);
  }
  &__popover {
    padding: 4px;

    &-item {
      display: flex;
      align-items: center;
      border-radius: var(--el-border-radius-base);
      height: 36px;
      padding-left: 12px;

      &:hover {
        background-color: var(--el-color-primary-light-8);
      }
    }
    &-desc {
      text-indent: 1em;
    }
  }
}
</style>
