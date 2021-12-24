import CustomLayout from '@/layout';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

const Slug = () => {
  const router = useRouter();
  console.log(router);

  return <div>ahahaha</div>;
};

Slug.getLayout = (page: ReactElement) => {
  return <CustomLayout>{page}</CustomLayout>;
};

export default Slug;
