import axios from 'axios';

// baseUrl
axios.defaults.baseURL = 'http://localhost:9000/api/';
// 30s 超时
axios.defaults.timeout = 30000;

export default axios;
