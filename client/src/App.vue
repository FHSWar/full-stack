<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const value1 = ref('');

axios.get('http://127.0.0.1:9000/').then((res) => console.log('9000', res));
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <div>
    <el-button>Default</el-button>
    <el-date-picker v-model="value1" type="datetime" placeholder="Select date and time" />
  </div>
</template>
