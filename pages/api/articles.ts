// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  id: string | number;
  title: string;
  content: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>,
) {
  res.status(200).json([
    { id: 1, title: '文章1', content: 'test' },
    { id: 2, title: '文章2', content: 'test' },
  ]);
}
