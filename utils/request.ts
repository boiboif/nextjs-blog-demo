import axios, { AxiosError } from 'axios';
import { message } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export function isValidKey(
  key: string | number | symbol,
  object: object,
): key is keyof typeof object {
  return key in object;
}

message.config({
  top: 100,
  duration: 3,
  maxCount: 1,
});
const service = axios.create({
  withCredentials: false, // send cookies when cross-domain requests
});
// request interceptor
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      return response.data;
    } else {
      message.error(response.data.message);

      return Promise.reject(response.data.message);
    }
  },
  (error: AxiosError) => {
    switch (error.response && error.response.status) {
      case 401:
        localStorage.removeItem('tenant_token');
        window.location.href = '#/login';
        break;
      case 403:
        localStorage.removeItem('tenant_token');
        window.location.href = '#/login';
        break;
      default:
        break;
    }
    const { response } = error;
    if (response) {
      if (isValidKey(response.status, codeMessage)) {
        message.error({
          content: codeMessage[response.status],
        });
      } else {
        message.error({
          content: response.data.msg,
        });
      }
    } else if (!axios.isCancel(error)) {
      message.error('网络异常');
    }

    return Promise.reject(error);
  },
);
export default service;
