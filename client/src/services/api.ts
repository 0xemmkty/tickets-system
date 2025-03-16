import axios from 'axios';

// 创建不同的 API 实例
const authApi = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

const ticketsApi = axios.create({
  baseURL: 'http://localhost:3002/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

const ordersApi = axios.create({
  baseURL: 'http://localhost:3003/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// 添加认证拦截器
const addAuthInterceptor = (api: any) => {
  api.interceptors.request.use(
    (config: any) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/signin';
      }
      return Promise.reject(error);
    }
  );
};

// 为所有 API 实例添加拦截器
addAuthInterceptor(authApi);
addAuthInterceptor(ticketsApi);
addAuthInterceptor(ordersApi);

export { authApi, ticketsApi, ordersApi }; 