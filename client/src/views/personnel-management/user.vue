<script lang="ts" setup>
import { getUserList } from '@/api/personnel';

const getList = async () => {
	const one = await getUserList();
	console.log('getList', one);
};
getList();
</script>

<template>
  user
</template>

<style lang="scss" scoped>
</style>
