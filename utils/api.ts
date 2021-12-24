import { customApi } from './handleApi';

const baseUrl = 'http://localhost:3001';

/** 文章管理 */
export const getArticles = customApi<any, CustomResData<API.Article>>(baseUrl + '/api/post', 'get');
export const getArticleById = (id: string) => customApi<never, ObjResData<API.Article>>(`${baseUrl}/api/post/${id}`, 'get')