import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://bootcamp-api.codeit.kr/api/15-8/the-julge',
});

export default instance;
