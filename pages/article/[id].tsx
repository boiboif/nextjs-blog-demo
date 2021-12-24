import CustomLayout from '@/layout/customLayout';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import SiderLayout from '@/layout/siderLayout';
import { useRequest } from 'ahooks';
import { getArticleById } from '@/utils/api';
import Markdown from '@/components/markdown';
import MarkdownNav from '@/components/markdown/markdownNav';
import { Space, Image } from 'antd';
import moment from 'moment';
import {
  SisternodeOutlined,
  FieldTimeOutlined,
  FileWordOutlined,
} from '@ant-design/icons';

const Article = () => {
  const router = useRouter();

  const { data } = useRequest(
    () => getArticleById(router.query.id as string)(),
    {
      ready: !!router.query.id,
    },
  );

  return (
    <SiderLayout
      sider={
        <div
          className="sticky overflow-y-auto bg-white rounded"
          style={{ maxHeight: '80vh', top: 50 }}
        >
          <h1 className="text-center pt-4 text-xl">目录</h1>
          <div className="p-4">
            <MarkdownNav value={data?.data.content || ''}></MarkdownNav>
          </div>
        </div>
      }
      content={
        <div className="bg-white rounded p-8">
          <h1 className="text-gray-700 text-center text-3xl font-bold transition leading-10">
            {data?.data.title}
          </h1>
          <div className="sm:px-8 mb-2 sm:mb-4">
            <Space wrap>
              <span className="text-md sm:text-lg">
                <SisternodeOutlined className="mr-2" />
                发布于 {moment(data?.data.create_time).format('YYYY-MM-DD')}
              </span>
              <span className="text-md sm:text-lg text-blue-400">
                <FieldTimeOutlined className="mr-2" />
                更新于 {moment(data?.data.update_time).format('YYYY-MM-DD')}
              </span>
              <span className="text-md sm:text-lg text-yellow-600">
                <FileWordOutlined className="mr-2" />
                阅读次数 {data?.data.readCount}
              </span>
            </Space>
          </div>

          {data?.data.thumb_url && (
            <div className="text-center">
              <Image src={data?.data.thumb_url} alt=""></Image>
            </div>
          )}
          <Markdown value={data?.data.content || ''}></Markdown>
        </div>
      }
    ></SiderLayout>
  );
};

Article.getLayout = (page: ReactElement) => {
  return <CustomLayout>{page}</CustomLayout>;
};

// export const getServerSideProps: GetServerSideProps = async (context) => {

// }

export default Article;
