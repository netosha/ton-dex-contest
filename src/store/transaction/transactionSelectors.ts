// eslint-disable-next-line import/no-cycle
import { createSelector } from 'reselect';

import { RootState } from '@store/store';

/**
 * Selects token store
 */
export const selectTransaction = ({ transaction }: RootState) => transaction;

const selectItemId = (_st: any, itemId: any) => itemId;

export const selectTransactionsByAddress = createSelector(
  [selectTransaction, selectItemId],
  ({ transactions, isTransactionsLoading }, address: string) => {
    return {
      transactions: Object.values(transactions).filter(
        (t) => t!.from === address || t!.to === address
      ),
      isTransactionsLoading,
    };
  }
);
