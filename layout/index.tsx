import { NextComponentType } from 'next';
import React, { useRef } from 'react';
import Header from '@/components/header';
import styles from './index.module.scss';
import { ArrowDownOutlined } from '@ant-design/icons';
import { useSize } from 'ahooks';
import scrollTo from 'antd/lib/_util/scrollTo';

const IndexLayout: NextComponentType = (props) => {
  const { children } = props;
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);

  return (
    <>
      <div className={styles.layout_wrap} ref={ref}>
        <Header></Header>
        <div
          className={styles.layout_banner + ' h-72  sm:h-screen mb-2 sm:mb-4'}
        >
          <div className="-translate-y-1/2 absolute top-1/2 w-full text-white z-100 text-center">
            <p className="text-4xl sm:text-8xl font-bold mb-4 sm:mb-8">
              bbf&lsquo;s Blog
            </p>
            <p className="text-xl sm:text-2xl">write code and love life</p>
          </div>

          <div className="absolute left-1/2 bottom-6 sm:bottom-20 -tanslate-x-1/2 text-center">
            <ArrowDownOutlined
              style={{ color: '#fff' }}
              className="text-xl cursor-pointer animate-bounce"
              onClick={() => {
                if (size) {
                  scrollTo(
                    size.width <= 622
                      ? 288
                      : document.documentElement.offsetHeight,
                  );
                }
              }}
            />
          </div>
        </div>

        {children}
      </div>
    </>
  );
};

export default IndexLayout;
