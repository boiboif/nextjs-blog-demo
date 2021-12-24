import { NextComponentType } from 'next';
import React from 'react';
import Header from '@/components/header';

const CustomLayout: NextComponentType = (props) => {
  const { children } = props;

  return (
    <>
      <Header initOpacity={false} changeOpacity={false}></Header>

      <div style={{ marginTop: 60 }}>{children}</div>
    </>
  );
};

export default CustomLayout;
