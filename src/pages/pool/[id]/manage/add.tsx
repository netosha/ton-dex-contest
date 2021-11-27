import React from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Layout from '@components/Layout';
import AddLiquidity from '@components/LiquidityManager/AddLiquidity';
import { useSelector } from '@src/hooks';
import { selectWalletPools } from '@store/pool';
import { selectWallet } from '@store/wallet';

const Add: NextPage = () => {
  const { push, query } = useRouter();
  const { status, address } = useSelector(selectWallet);
  const { walletPools } = useSelector(selectWalletPools);

  const pool = walletPools[query.id as string];

  React.useEffect(() => {
    // Redirect to pool page, if wallet not provided or walletPools not includes this pool
    if (status !== 'connected' || !address) {
      push(`/pool/${query.id}/`);
    }
  }, [status, address]);

  // Todo: Implement loading info about pool, within walletPools
  if (!pool) {
    if (typeof window !== 'undefined') {
      push(`/pool/${query.id}/`);
    }
    return null;
  }

  return (
    <Layout>
      <div className="flex h-auto my-auto gap-4 items-center justify-center w-full">
        <AddLiquidity
          onAdd={() => push(`/pool/${pool.id}/manage`)}
          pool={pool}
        />
      </div>
    </Layout>
  );
};

export default Add;
