import { createReducer } from '@reduxjs/toolkit';

import * as actions from './walletActions';

export type WalletState = {
  address: null | string;
  balance: number;
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  error: null | object;
};

export const initialState: WalletState = {
  address: null,
  balance: 0,
  status: 'disconnected',
  error: null,
};

export const walletReducer = createReducer(initialState, (builder) =>
  builder
    /* Wallet connection flow  */
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

    /* Wallet reset flow */
    .addCase(actions.resetWallet, () => initialState)
);
