/* eslint-disable no-unused-vars */

declare interface TableData<T = any> extends Pagination {
  list: T[];
}

declare interface Pagination {
  count: number;
  page: number;
  size: number;
}

declare interface CustomResData<T = any> {
  data: TableData<T>;
  message: string;
  code: number;
}

declare interface ObjResData<T = any> {
  data: T;
  message: string;
  code: number;
}

declare namespace API {
  type Article = {
    id: number;
    title: string;
    author: string;
    content: string;
    thumb_url?: string;
    type: number;
    readCount: number;
    create_time: string;
    update_time: string;
    briefContent: string;
  };
}
