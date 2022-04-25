<script setup lang="ts">

/* axios.get('http://127.0.0.1:9000/test').then((res) => console.log('test', res));

const source = new EventSource('http://localhost:9000/sse');
source.onopen = () => console.log('Connected');
source.onerror = console.error;
source.onmessage = console.log; */
</script>

<template>
  <router-view />
</template>

<style lang="scss">
body{
  background-color: blue;
}
</style>
