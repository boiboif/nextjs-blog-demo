import { useState, useCallback, useEffect } from 'react';

/**
 *
 * @param value 阈值
 * @returns 鼠标滚动方向
 */
export const useScorllPosition = (value = 300) => {
  const [status, setStatus] = useState<'up' | 'down' | 'none'>('none');
  const [scrollTop, setScrollTop] = useState(0);

  const scroll = useCallback(() => {
    const scrollTopTemp = document.documentElement.scrollTop;
    setScrollTop(scrollTopTemp);

    if (scrollTop >= value) {
      if (scrollTopTemp > scrollTop) {
        // 下滚
        setStatus('down');
      } else {
        // 上滚
        setStatus('up');
      }
    }
  }, [scrollTop, value]);

  useEffect(() => {
    window.addEventListener('scroll', scroll);

    return () => {
      window.removeEventListener('scroll', scroll);
    };
  }, [scroll, scrollTop, value]);

  return status;
};
