import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://developers.paysera.com/tasks/api/',
});
