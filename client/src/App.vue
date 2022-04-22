<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const value1 = ref('');

axios.get('http://127.0.0.1:9000/').then((res) => console.log('9000', res));

/* const source = new EventSource('http://localhost:9000/sse');
source.onopen = () => console.log('Connected');
source.onerror = console.error;
source.onmessage = console.log; */
</script>

<template>
  <div>
    <el-button>Default</el-button>
    <el-date-picker v-model="value1" type="datetime" placeholder="Select date and time" />
  </div>
</template>
