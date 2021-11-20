import React from 'react';

import cn from 'clsx';
import { NextPage } from 'next';

import Layout from '@components/Layout';
import PoolCard from '@components/PoolCard';
import Table from '@components/Table';
import { useDispatch, useSelector } from '@src/hooks';
import { Button } from '@src/ui';
import { getPools, selectPools } from '@store/pool';
import { selectWallet } from '@store/wallet';

const columns = [
  { key: 'position', label: '' },
  { key: 'pool', label: 'Pool' },
  { key: 'total', label: 'TVL' },
  { key: 'volume', label: 'Volume 24h' },
];

const Pools: NextPage = () => {
  const wallet = useSelector(selectWallet);
  const { items: pools, isLoading } = useSelector(selectPools);
  const dispatch = useDispatch();

  // console.log(pools);

  // TODO: Make it as separate function
  const rows = isLoading
    ? []
    : Object.values(pools).map((p, i) => ({
        id: p.id,
        position: i + 1,
        pool: (
          <span>
            {p.pair[0].symbol}/{p.pair[1].symbol}
          </span>
        ),
        total: <span>${p.totalPrice}m</span>,
        volume: p.volume,
      }));

  React.useEffect(() => {
    // Todo: Replace with properly check of cached values
    if (!Object.entries(pools).length) {
      dispatch(getPools({}));
    }
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl mt-4 font-black text-violet">Your pools</h1>
      <div>
        {wallet.status !== 'connected' && (
          <span className="text-violet-60">
            Connect wallet to view your pools
          </span>
        )}

        {wallet.status === 'connected' && (
          <>
            <div
              className={cn(
                'grid grid-cols-2 gap-4 mb-4',
                'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
              )}
            >
              {Array.from({ length: 5 }).map((_p, i) => (
                <PoolCard key={i} />
              ))}
            </div>
            <Button>Create new pool</Button>
          </>
        )}
      </div>
      <h1 className="text-4xl mt-4 font-black text-violet">All pools</h1>
      <Table
        isLoading={isLoading}
        columns={columns}
        rows={rows}
        layout="20px minmax(70px, 3fr) repeat(3, 1fr)"
      />
    </Layout>
  );
};

export default Pools;
