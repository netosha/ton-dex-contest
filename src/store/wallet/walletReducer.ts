import { createReducer } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle

import { Transaction } from '@src/types';

// eslint-disable-next-line import/no-cycle
import * as actions from './walletActions';

export type WalletState = {
  address: null | string;
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  error: null | object;
  /**
   * TONCOIN balance
   */
  balance: number;

  /**
   * Balances of ERC-20-like tokens
   *
   * If balance is null - it's loading
   */
  balances: {
    [address: string]: number | null;
  };

  /**
   *  List of wallet transaction
   */
  transactions: { [address: string]: Transaction[] };

  /**
   * Status of fetching transaction
   */
  isTransactionsLoading: boolean;
};

export const initialState: WalletState = {
  address: null,
  balance: 0,
  status: 'disconnected',
  error: null,
  balances: {},
  transactions: {},
  isTransactionsLoading: false,
};

export const walletReducer = createReducer(initialState, (builder) =>
  builder
    /* Wallet connection  */
    .addCase(actions.connectWallet.pending, (state) => {
      state.status = 'connecting';
    })
    .addCase(actions.connectWallet.fulfilled, (state, action) => {
      state.address = action.payload.address;
      state.balance = action.payload.balance;
      state.status = 'connected';
    })
    .addCase(actions.connectWallet.rejected, (state) => {
      state.status = 'error';
      state.error = { message: 'Sample unexpected error' };
    })
    /* Fetching token balance  */
    .addCase(actions.getTokenBalance.pending, (state, action) => {
      state.balances[action.meta.arg] = null;
    })
    .addCase(actions.getTokenBalance.fulfilled, (state, action) => {
      state.balances[action.payload.tokenAddress] = action.payload.balance;
    })
    .addCase(actions.getTokenBalance.rejected, (state, action) => {
      // TODO: Replace it with destructing object
      delete state.balances[action.meta.arg];
    })

    /* Wallet reset  */
    .addCase(actions.resetWallet, () => initialState)
);
