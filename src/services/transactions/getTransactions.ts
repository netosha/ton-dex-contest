import { Transaction } from '@src/types';
import { sleep } from '@src/utils';

const getTransactions = async (address: string, offset = 0, limit = 20) => {
  await sleep(Math.random() * 1000);

  const transactions: Transaction[] = Array.from({ length: 100 }).map(() => ({
    hash: (Math.random() + 1).toString(36).substring(7),
    timestamp: Date.now() - 10000,
    from: Math.random().toString(10).substring(2),
    to: address,
    method: 'swap',
    misc: {
      swapFrom: address,
      swapTo: address,
      swapFromAmount: 12,
      swapToAmount: 24,
    },
  }));

  return transactions.slice(offset).slice(0, limit);
};

export default getTransactions;
