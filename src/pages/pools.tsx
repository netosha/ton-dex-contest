import React from 'react';

import cn from 'clsx';
import { sortBy } from 'lodash';
import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';

import Layout from '@components/Layout';
import PoolCard from '@components/PoolCard';
import Table, { OrderBy, Row } from '@components/Table';
import { useDispatch, useSelector } from '@src/hooks';
import { Button } from '@src/ui';
import {
  getPools,
  getWalletPools,
  selectPools,
  selectWalletPools,
} from '@store/pool';
import { selectWallet } from '@store/wallet';

const columns = [
  { key: 'position', label: '' },
  { key: 'pool', label: 'Pool' },
  { key: 'total', label: 'TVL' },
  { key: 'volume', label: 'Volume 24h' },
];

const Pools: NextPage = () => {
  const { status, address } = useSelector(selectWallet);
  const { pools, isPoolsLoading } = useSelector(selectPools);
  const { walletPools, isWalletPoolsLoading } = useSelector(selectWalletPools);
  const [orderBy, setOrderBy] = React.useState<null | OrderBy>(null);

  const dispatch = useDispatch();

  // Probably need useMemo in future
  const orderedRows = orderBy
    ? sortBy(Object.values(pools))
    : Object.values(pools);

  if (orderBy?.order === 'desc') {
    orderedRows.reverse();
  }

  // TODO: Make it as separate function
  const rows: Row[] = orderedRows.map((p, i) => ({
    id: p.id,
    position: <span className="text-violet-40">{i + 1}</span>,
    pool: (
      <span>
        {p.pair[0].symbol}/{p.pair[1].symbol}
      </span>
    ),
    total: <span>${p.totalLocked}m</span>,
    volume: <span>${p.volume}m</span>,
    rowProps: {
      onClick: () => Router.push(`/pool/${p.id}`),
    },
  }));

  React.useEffect(() => {
    // Todo: Replace with properly check of cached values
    if (!Object.entries(pools).length) {
      dispatch(getPools({}));
    }
  }, []);

  React.useEffect(() => {
    // Todo: replace better nicer update rule
    if (
      status === 'connected' &&
      address &&
      !Object.entries(walletPools).length
    ) {
      dispatch(getWalletPools({}));
    }
  }, [status, address]);

  return (
    <Layout>
      <h1 className="text-4xl mt-4 font-black text-violet">Your pools</h1>
      <div>
        {status !== 'connected' && (
          <span className="text-violet-60">
            Connect wallet to view your pools
          </span>
        )}

        {status === 'connected' && (
          <>
            <div
              className={cn(
                'grid auto-rows-max grid-cols-2  auto-rows-max gap-4 mb-4',
                'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
              )}
            >
              {walletPools &&
                Object.values(walletPools).map((p) => (
                  <Link href={`/pool/${p.id}`} key={p.id}>
                    <PoolCard pool={p} />
                  </Link>
                ))}
              {isWalletPoolsLoading &&
                Array.from({ length: 3 }).map((_p, i) => (
                  <div
                    key={i}
                    className="w-full rounded-md animate-shine h-[7.5rem]"
                  />
                ))}
            </div>
            <Link href="/pool/create">
              <Button>Create new pool</Button>
            </Link>
          </>
        )}
      </div>
      <h1 className="text-4xl mt-4 font-black text-violet">All pools</h1>
      <Table
        isLoading={isPoolsLoading}
        columns={columns}
        rows={rows}
        layout="1rem minmax(70px, 4fr) minmax(70px, 1fr) minmax(70px, 1fr)"
        orderBy={orderBy}
        onOrderByChange={(o) => setOrderBy(o)}
      />
    </Layout>
  );
};

export default Pools;
