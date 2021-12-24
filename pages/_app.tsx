import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { NextPage } from 'next';
import 'tailwindcss/tailwind.css';
import { ReactElement, ReactNode, useEffect } from 'react';
import { ConfigProvider } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import { BackTop } from 'antd';
import { useRouter } from 'next/router';
import { useMemoizedFn } from 'ahooks';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const Router = useRouter();

  const initRouterListeners = useMemoizedFn(() => {
    let latestScrollY = 0; // 跳转前的偏移量
    let latestUrl = window.location.pathname; // 跳转前的路由名（默认值为刚打开页面时的路由）
    let route: any[] = []; // 跳转的路由集合

    // 路由跳转开始时触发
    Router.events.on('routeChangeStart', () => {
      // 此时取到的值是未跳转前页面的偏移量，赋值给 latestScrollY
      latestScrollY =
        document.body.scrollTop ||
        document.documentElement.scrollTop ||
        window.pageYOffset;
      // 向路由集合中加入跳转前的路由名以及页面偏移量
      route.push({ url: latestUrl, scrollY: latestScrollY });
      // 如果路由集合大于两个，删除第一项
      if (route.length > 2) route.shift();
    });

    // 路由跳转结束时触发
    Router.events.on('routeChangeComplete', (url) => {
      // 返回上一页（路由集合不为空且当前路由名等于路由集合第一项的路由名）
      if (route.length > 0 && url === route[0].url) {
        // 跳转到上次滑动的位置
        window.requestAnimationFrame(() =>
          window.scrollTo(0, route[0].scrollY),
        );
        // 将 latestUrl 赋值为当前路由名
        latestUrl = url;
      } else {
        // 跳转至新一页，滑动到开头
        window.requestAnimationFrame(() => window.scrollTo(0, 0));
        // 将 latestUrl 赋值为当前路由名
        latestUrl = url;
      }
    });
  });

  useEffect(() => {
    initRouterListeners();
  }, [initRouterListeners]);

  return (
    <>
      <div className="fixed w-full h-full left-0 top-0 bg-gray-200 bg-global -z-1"></div>
      <BackTop></BackTop>
      {getLayout(
        <ConfigProvider locale={zhCN}>
          <>
            <Component {...pageProps} />
          </>
        </ConfigProvider>,
      )}
    </>
  );
}

export default MyApp;
