import { createReducer } from '@reduxjs/toolkit';

import { Transaction } from '@src/types';

import * as actions from './transactionActions';

export type TransactionState = {
  transactions: {
    [hash: string]: Transaction;
  };
  isTransactionsLoading: boolean;
};

export const initialState: TransactionState = {
  transactions: {},
  isTransactionsLoading: false,
};

export const transactionReducer = createReducer(initialState, (builder) =>
  builder
    /* Get transactions list by address */
    .addCase(actions.getAddressTransactions.pending, (state) => {
      state.isTransactionsLoading = true;
    })
    .addCase(actions.getAddressTransactions.fulfilled, (state, action) => {
      const { transactions } = action.payload;
      const keyedTransactions = transactions.reduce(
        (prev, cur) => ({ ...prev, [cur.hash]: cur }),
        {}
      );
      Object.assign(state.transactions, keyedTransactions);
      state.isTransactionsLoading = false;
    })
    .addCase(actions.getAddressTransactions.rejected, (state) => {
      state.isTransactionsLoading = false;
    })
);
