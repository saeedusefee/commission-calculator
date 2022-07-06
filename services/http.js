import axios from 'axios';

const client = axios.create({
  baseURL: 'https://developers.paysera.com/tasks/api/',
});

export default client;
