// TODO: Replace to bundled when reselect in redux-toolkit  bumps to >= 4.1.3 (just update @reduxjs/toolkit)
// https://github.com/reduxjs/redux-toolkit/blob/master/packages/toolkit/package.json
// https://github.com/reduxjs/reselect/pull/545
import { createSelector } from 'reselect';

import { RootState } from '../store';

export const selectWallet = ({ wallet }: RootState) => wallet;

export const selectTokenBalances = createSelector(
  selectWallet,
  ({ balances }) => balances
);

export const selectTransactions = createSelector(
  selectWallet,
  ({ transactions, isTransactionsLoading }) => ({
    transactions,
    isTransactionsLoading,
  })
);
