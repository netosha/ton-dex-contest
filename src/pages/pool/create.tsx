import React from 'react';

import { NextPage } from 'next';

import Layout from '@components/Layout';
import TokenPicker from '@components/TokenPicker';
import { PickedTokens } from '@components/TokenPicker/TokenPicker.types';

const Create: NextPage = () => {
  const [tokens, setTokens] = React.useState<PickedTokens>([null, null]);

  return (
    <Layout>
      <div className="flex h-auto my-auto flex-col gap-4 items-center justify-center w-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-black text-violet">Exchange tokens</h1>
          <TokenPicker onChange={setTokens} tokens={tokens} type={'stake'} />
        </div>
      </div>
    </Layout>
  );
};

export default Create;
