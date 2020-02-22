import axios from 'axios';

// for now only one api is used
const api = axios.create({
  baseURL: 'https://opentdb.com/api.php?',
});

export default api;
