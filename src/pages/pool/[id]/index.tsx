import React from 'react';

import { sortBy } from 'lodash';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Chart from '@components/Chart';
import Layout from '@components/Layout';
import Loader from '@components/Loader';
import ManageButton from '@components/ManageButton';
import PoolInfo from '@components/PoolInfo';
import Table, { OrderBy, Row } from '@components/Table';
import { useDispatch, useSelector } from '@src/hooks';
import { Button } from '@src/ui';
import {
  getPool,
  getPoolGraphData,
  selectDetailedPool,
  selectPoolGraphData,
} from '@store/pool';
import {
  getAddressTransactions,
  selectTransactionsByAddress,
} from '@store/transaction';
import { selectWallet } from '@store/wallet';

const columns = [
  { key: 'hash', label: 'Hash' },
  { key: 'method', label: 'Method' },
  { key: 'from', label: 'From' },
  { key: 'to', label: 'To' },
  { key: 'timestamp', label: 'Date' },
];

const PAGE_SIZE = 20;

const Pool: NextPage = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { id } = query;
  const { status, address } = useSelector(selectWallet);

  // Transactions table offset
  const [offset, setOffset] = React.useState<number>(0);

  const pool = useSelector((state) => selectDetailedPool(state, id as string));
  const graphData = useSelector((state) =>
    selectPoolGraphData(state, id as string)
  );
  const { isTransactionsLoading, transactions } = useSelector((state) =>
    selectTransactionsByAddress(state, id as string)
  );

  const [orderBy, setOrderBy] = React.useState<null | OrderBy>(null);

  const orderedTransactions = orderBy
    ? sortBy(transactions, orderBy.column)
    : transactions;

  if (orderBy?.order === 'desc') {
    orderedTransactions.reverse();
  }

  // Todo: Make it as separate function
  const rows: Row[] = orderedTransactions.map((tx) => ({
    id: tx.hash,
    hash: <span className="font-bold">#{tx.hash.slice(0, 4)}..</span>,
    from: <span className="font-bold">{tx.from.slice(0, 20)}..</span>,
    to: <span className="font-bold">{tx.to.slice(0, 20)}..</span>,
    method: <span className="text-violet-60 ">{tx.method}</span>,
    timestamp: (
      <span className="ml-auto text-sm text-violet-60">
        {new Date(tx.timestamp).toLocaleString()}
      </span>
    ),
    rowProps: {
      href: 'https://ton.sh',
      target: '_blank',
    },
  }));

  React.useEffect(() => {
    dispatch(getPool(id as string));
    dispatch(getPoolGraphData(id as string));
  }, []);

  // Fetch transactions
  React.useEffect(() => {
    // TODO: Replace address from pool's id to contract address
    dispatch(
      getAddressTransactions({
        address: id as string,
        offset,
        limit: PAGE_SIZE,
      })
    );
  }, [offset]);

  return (
    <Layout>
      <section className="text-4xl mt-4 font-black text-violet">
        {pool ? (
          <>
            <Link href="/tokens">
              <a className="transition-colors hover:text-blue">
                {pool.pair[0].symbol}
              </a>
            </Link>
            <span className="text-violet-30 mx-2">/</span>
            <Link href="/tokens">
              <a className="transition-colors hover:text-blue">
                {pool.pair[1].symbol}
              </a>
            </Link>
          </>
        ) : (
          <div className="h-10 my-1 w-64 animate-shine rounded-md" />
        )}
      </section>
      <section className="mb-4">
        <ManageButton pool={pool} address={address} status={status} />
      </section>

      <section className="min-h-[20rem] w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="w-full grid gap-4 col-span-1">
          <PoolInfo pool={pool} />
        </div>
        {graphData === null ? (
          <div className=" animate-shine rounded-md col-span-1 md:col-span-2 p-3 h-[20rem]" />
        ) : (
          <div className="bg-control rounded-md col-span-1 md:col-span-2 p-3 h-[20rem]">
            <Chart data={graphData} />
          </div>
        )}
      </section>

      <div className="w-full mt-2">
        <h2 className="text-3xl font-black text-violet">Transactions</h2>
        <div className="flex flex-col gap-2">
          <Table
            layout="3.5rem 5rem minmax(5rem, 1fr) minmax(5rem, 1fr) minmax(5rem, 1fr)"
            rows={rows}
            orderBy={orderBy}
            onOrderByChange={(o) => setOrderBy(o)}
            columns={columns}
            isLoading={isTransactionsLoading}
          />
          <Button
            className="bg-control flex justify-center"
            onClick={() => setOffset((v) => v + PAGE_SIZE)}
          >
            {isTransactionsLoading ? <Loader /> : 'Load more'}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

// Little trick to pass query params in router without re-rendering
// Check query logic before remove and remove, if needed
// https://nextjs.org/docs/api-reference/next/router#router-object
export async function getServerSideProps() {
  return { props: {} };
}

export default Pool;
