import React, { FC, useRef } from 'react';
import styles from './index.module.scss';
import { useScroll, useSize } from 'ahooks';
import classNames from 'classnames';
import { useScorllPosition } from '@/hooks';
import scrollTo from 'antd/lib/_util/scrollTo';
import { HomeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

interface HeaderProps {
  initOpacity?: boolean;
  changeOpacity?: boolean;
}

const Header: FC<HeaderProps> = (props) => {
  const { initOpacity = true, changeOpacity = true } = props;
  const postion = useScroll();
  const status = useScorllPosition(50);
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);
  const router = useRouter();

  return (
    <div
      className={classNames([
        styles.header,
        'bg-black duration-500 transition',
        {
          'bg-opacity-0': initOpacity,
          'bg-opacity-75': changeOpacity && (postion?.top || 0) !== 0,
          '-translate-y-full': status === 'down',
        },
      ])}
      ref={ref}
    >
      <div className="max-w-screen-xl m-auto h-full">
        <ul className="flex h-full">
          <li
            className="mr-2 px-5 cursor-pointer transition hover:bg-gray-500 text-lg flex items-center"
            onClick={() => {
              if (size && router.asPath === '/') {
                scrollTo(
                  size.width <= 622
                    ? 288
                    : document.documentElement.offsetHeight,
                );
              } else {
                router.push('/');
              }
            }}
          >
            <HomeOutlined className="mr-2" />
            首页
          </li>
          <li className="mr-2 px-5 cursor-pointer transition hover:bg-gray-500 text-lg  flex items-center" onClick={() => {
            router.push('/category')
          }}>
            分类
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
