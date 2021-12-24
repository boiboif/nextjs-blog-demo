import Head from 'next/head';
// import styles from '@/styles/Index.module.css';
import { ReactElement, useEffect } from 'react';
import IndexLayout from '@/layout';
import SiderLayout from '@/layout/siderLayout';
import MyselfCard from '@/components/myselfCard';
import { Card, Space, Button, Image, Pagination } from 'antd';
import {
  ArrowRightOutlined,
  SisternodeOutlined,
  FieldTimeOutlined,
  FileWordOutlined,
} from '@ant-design/icons';
import { getArticles } from '@/utils/api';
import moment from 'moment';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import scrollTo from 'antd/lib/_util/scrollTo';

interface IndexProps {
  articleData: TableData<API.Article>;
}

const Index = (props: IndexProps) => {
  const { articleData } = props;
  const router = useRouter();

  const toArticlePage = (articleId: number) => {
    router.push('/article/' + articleId);
  };

  const handlePagiChange = (page: number, size: number) => {
    router.push(
      {
        query: {
          page: page,
          size: size,
        },
      },
      '',
      {
        scroll: false,
      },
    );
    scrollTo(900);
  };

  return (
    <div className="max-w-screen-xl m-auto">
      <Head>
        <title>首页</title>
        <meta name="description" content="bbf的个人博客" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: '100vh' }}>
        {articleData.list?.map((article) => {
          return (
            <div className="mb-8" key={article.id}>
              <Card>
                <h1
                  className="text-gray-800 text-center text-4xl font-bold hover:underline cursor-pointer transition leading-10"
                  onClick={() => toArticlePage(article.id)}
                >
                  {article.title}
                </h1>
                <div className="sm:px-8 mb-2 sm:mb-4">
                  <Space wrap>
                    <span className="text-md sm:text-lg">
                      <SisternodeOutlined className="mr-2" />
                      发布于 {moment(article.create_time).format('YYYY-MM-DD')}
                    </span>
                    <span className="text-md sm:text-lg text-blue-400">
                      <FieldTimeOutlined className="mr-2" />
                      更新于 {moment(article.update_time).format('YYYY-MM-DD')}
                    </span>
                    <span className="text-md sm:text-lg text-yellow-600">
                      <FileWordOutlined className="mr-2" />
                      阅读次数 {article.readCount}
                    </span>
                  </Space>
                </div>

                {article.thumb_url && (
                  <div className="text-center">
                    <Image src={article.thumb_url} alt=""></Image>
                  </div>
                )}

                <section className="px-2 text-lg leading-loose mb-10">
                  {article.briefContent.repeat(10)}
                </section>

                <div className="text-center">
                  <Button
                    type="primary"
                    onClick={() => toArticlePage(article.id)}
                  >
                    阅读全文
                    <ArrowRightOutlined />
                  </Button>
                </div>
              </Card>
            </div>
          );
        })}

        <Card className="flex justify-center">
          <Pagination
            current={articleData.page}
            pageSize={articleData.size}
            total={articleData.count}
            showTotal={(total) => `总共 ${total} 条`}
            showSizeChanger
            showQuickJumper
            onChange={handlePagiChange}
          ></Pagination>
        </Card>
      </div>
    </div>
  );
};

Index.getLayout = (page: ReactElement) => {
  return (
    <IndexLayout>
      <SiderLayout sider={<MyselfCard />} content={page}></SiderLayout>
    </IndexLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await getArticles(context.query);

  return {
    props: {
      articleData: res.data,
    },
  };
};

export default Index;
