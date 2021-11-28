import React from 'react';

import type { NextPage } from 'next';

import Layout from '@components/Layout';

const Index: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col mt-4 gap-2">
        <a
          href="https://github.com/netosha/ton-dex-contest/blob/main/README.md"
          target="_blank"
          className="text-4xl font-black text-blue hover:text-darkblue transition-colors"
          rel="noreferrer"
        >
          README
        </a>
      </div>
    </Layout>
  );
};

export default Index;
