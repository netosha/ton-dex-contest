import { Transaction } from '@src/types';
import { sleep } from '@src/utils';

const getTransactions = async (address: string, offset = 0, limit = 20) => {
  await sleep(Math.random() * 1000);

  const transactions: Transaction[] = Array.from({ length: limit }).map(
    (_, i) => ({
      hash: (Math.random() + 1).toString(36).substring(7),
      timestamp: new Date(2021, 11, 31 - offset, 24 - i).getTime(),
      from: Math.random().toString(10).substring(2),
      to: address,
      method: Math.random() > 0.5 ? 'swap' : 'transfer',
      misc: {
        swapFrom: address,
        swapTo: address,
        swapFromAmount: 12,
        swapToAmount: 24,
      },
    })
  );

  return transactions;
};

export default getTransactions;
