import React, { FC, ReactNode } from 'react';

interface SiderLayoutProps {
  sider: ReactNode;
  content: ReactNode;
}

const SiderLayout: FC<SiderLayoutProps> = (props) => {
  const { sider, content } = props;
  return (
    <div className="flex max-w-screen-xl mx-auto">
      <aside className="hidden w-80 lg:block mr-10">{sider}</aside>
      <section className="flex-1 overflow-hidden" style={{ width: '100%', maxWidth: 950 }}>
        {content}
      </section>
    </div>
  );
};

export default SiderLayout;
