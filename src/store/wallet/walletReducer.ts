import { createReducer } from '@reduxjs/toolkit';

import * as actions from './walletActions';

export type WalletState = {
  address: null | string;
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  error: null | object;
};

export const initialState: WalletState = {
  address: null,
  status: 'disconnected',
  error: null,
};

export const walletReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(actions.connectWallet.pending, (state) => {
      state.status = 'connecting';
    })
    .addCase(actions.connectWallet.fulfilled, (state, action) => {
      state.address = action.payload.address;
      state.status = 'connected';
    })
    .addCase(actions.connectWallet.rejected, (state) => {
      state.status = 'error';
      state.error = { message: 'Sample unexpected error' };
    })
);
