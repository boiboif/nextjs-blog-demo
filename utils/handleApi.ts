import { Method, AxiosRequestConfig, CancelToken } from 'axios';
import service from '../utils/request';
import { set } from 'lodash';

export const customApi =
  <T = any, U = any>(url: string, method: Method = 'post', _header: any = {}) =>
  async (data?: T, header1?: any, sourceToken?: CancelToken): Promise<U> => {
    const requestOption: AxiosRequestConfig = {
      url: url,
      headers: {
        // Authorization: localStorage.getItem('saas_token'),
        ..._header,
        ...header1,
      },
      cancelToken: sourceToken,
    };
    url.includes('login') && delete requestOption.headers?.Authorization;
    set(requestOption, 'method', method);
    set(
      requestOption,
      method === 'get' || method === 'GET' ? 'params' : 'data',
      data,
    );

    const response = await service.request<T, U>(requestOption);
    return response;
  };
