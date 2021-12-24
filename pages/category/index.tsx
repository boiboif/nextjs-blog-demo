import CustomLayout from '@/layout/customLayout';
import SiderLayout from '@/layout/siderLayout';
import { Card } from 'antd';
import React, { ReactElement } from 'react';

const Category = () => {
  return (
    <div className="max-w-screen-xl m-auto">
      <Card>123</Card>
      123
    </div>
  );
};

Category.getLayout = (page: ReactElement) => {
  return (
    <CustomLayout>
      <SiderLayout sider={<Card>123</Card>} content={page}></SiderLayout>
    </CustomLayout>
  );
};

export default Category;
