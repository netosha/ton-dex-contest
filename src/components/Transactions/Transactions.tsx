import React from 'react';

import Loader from '@components/Loader';
import { useDispatch, useSelector } from '@src/hooks';
import { Button } from '@src/ui';
import {
  getAddressTransactions,
  selectTransactionsByAddress,
} from '@store/transaction';

const PAGE_SIZE = 10;

const Transactions: React.VFC<{ address: string | undefined | null }> = ({
  address,
}) => {
  const [offset, setOffset] = React.useState(0);
  const { isTransactionsLoading, transactions } = useSelector((state) =>
    selectTransactionsByAddress(state, address)
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (offset === 0 && transactions?.length) {
      setOffset(Object.entries(transactions).length);
      return;
    }
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

  return (
    <div className="grid grid-flow-row gap-2">
      {transactions.map((tx) => (
        <a
          key={tx.hash}
          href="https://ton.sh/"
          className="w-full items-center px-4 py-2 grid bg-control rounded-md"
          style={{ gridTemplateColumns: '3.5rem 1fr auto' }}
        >
          <span className="font-bold">#{tx.hash.slice(0, 4)}..</span>
          <span className="ml-4 text-violet-60">{tx.method}</span>
          <span className="ml-auto text-sm text-violet-60">
            {new Date(tx.timestamp).toLocaleString()}
          </span>
        </a>
      ))}
      {isTransactionsLoading &&
        Array.from({ length: PAGE_SIZE }).map((_t, index) => (
          <div key={index} className="h-8 rounded-md w-full animate-shine" />
        ))}
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
