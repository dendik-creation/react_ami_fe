import axios from 'axios';
import { apiBaseUrl, credential, token } from './constant';

export const axiosInstance = axios.create({
  baseURL: `${apiBaseUrl}/${credential?.meta?.active_role}`,
  headers: {
    Authorization: token ? token : '',
  },
});
