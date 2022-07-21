<script lang="ts" setup>
</script>

<template>
  <div class="main-container">
    <div class="main-container__residual">
      <slot />
    </div>
    <div class="main-container__fill-up">
      <slot name="fillUp" />
    </div>
    <div class="main-container__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__fill-up {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
  }
}
</style>
