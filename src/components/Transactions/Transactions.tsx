import React from 'react';

import { sortBy } from 'lodash';

import Loader from '@components/Loader';
import Table, { OrderBy, Row } from '@components/Table';
import { useDispatch, useSelector } from '@src/hooks';
import { Button } from '@src/ui';
import {
  getAddressTransactions,
  selectTransactionsByAddress,
} from '@store/transaction';

const PAGE_SIZE = 10;

const columns = [
  { key: 'hash', label: 'Hash' },
  { key: 'method', label: 'Method' },
  { key: 'timestamp', label: 'Date' },
];
const Transactions: React.VFC<{ address: string | undefined | null }> = ({
  address,
}) => {
  const [offset, setOffset] = React.useState(0);

  const [orderBy, setOrderBy] = React.useState<null | OrderBy>(null);

  const { isTransactionsLoading, transactions } = useSelector((state) =>
    selectTransactionsByAddress(state, address)
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (address) {
      dispatch(getAddressTransactions({ address, offset, limit: PAGE_SIZE }));
    }
  }, [offset]);

  if (!address) {
    return (
      <div className="w-full">
        <span className="text-violet-60">No address given</span>
      </div>
    );
  }

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

  return (
    <div className="grid grid-flow-row gap-2">
      <Table
        layout="3.5rem repeat(2, 1fr)"
        rows={rows}
        orderBy={orderBy}
        onOrderByChange={(o) => setOrderBy(o)}
        columns={columns}
        isLoading={isTransactionsLoading}
        rowsProps={{ className: '!py-2 !px-4 !max-h-[2rem]' }}
      />
      <Button
        className="bg-control flex justify-center"
        onClick={() => setOffset((v) => v + PAGE_SIZE)}
      >
        {isTransactionsLoading ? <Loader /> : 'Load more'}
      </Button>
    </div>
  );
};

export default Transactions;
