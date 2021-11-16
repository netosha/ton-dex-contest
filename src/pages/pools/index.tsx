import React from 'react';

import { NextPage } from 'next';

import Layout from '@components/Layout';

const Pools: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-4xl mt-4 font-black text-violet">Your pools</h1>
    </Layout>
  );
};

export default Pools;
