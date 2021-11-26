import React from 'react';

import { NextPage } from 'next';

import Layout from '@components/Layout';
import LiquidityPicker from '@components/LiquidityPicker';

const Manage: NextPage = () => {
  return (
    <Layout>
      <div className="flex h-auto my-auto gap-4 items-center justify-center w-full">
        <LiquidityPicker />
      </div>
    </Layout>
  );
};

export default Manage;
