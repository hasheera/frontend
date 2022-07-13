import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

const AuthAxios = axios.create({
  baseURL: BASE_API,
});

AuthAxios.interceptors.request.use(
  config => {
    config.headers = {
      'Authorization': `Bearer ${Cookies.get('token')}`,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
    // 'Authorization': 'Bearer ';
    return config;
  },
  error => Promise.reject(error)
);

AuthAxios.interceptors.response.use(
  response => response,
  error => {
    const code =
      error && error.response ? error.response.status : 0;
    // if (code === 401 || code === 403 || code === 410 || code === 404) {
    //   Router.push('https://shopurban.co');
    // }
    return Promise.reject(error);
  })

export default AuthAxios;
