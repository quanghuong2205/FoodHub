import env from '@/configs/env';
import { wait } from '@/utils/wait';
import axios from 'axios';
import { TOKEN_KEY } from '@/constant/local-storage.key';
import { getLocalStorage } from '@/utils/local-storage';

/* Instance */
export const instance = axios.create({
  baseURL: `${env.SERVER_URL}/api`,
  timeout: 5000,
});

/* Request interceptor */
instance.interceptors.request.use(
  function (config) {
    /* Get token from local storage */
    const token = getLocalStorage(TOKEN_KEY);

    /* Attach auth to headers */
    config.headers.set('authorization', `Bearer ${token}`);

    /* Return config */
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

/* Response interceptor */
instance.interceptors.response.use(
  async function (response) {
    await wait(1000);
    return response.data?.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);
