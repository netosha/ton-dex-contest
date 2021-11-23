import { createReducer } from '@reduxjs/toolkit';

import { Pool, WalletPool } from '@src/types';

import * as actions from './poolActions';

export type PoolState = {
  pools: Pool[];
  walletPools: WalletPool[];
  isPoolsLoading: boolean;
};

export const initialState: PoolState = {
  pools: [],
  walletPools: [],
  isPoolsLoading: false,
};

export const poolReducer = createReducer(initialState, (builder) =>
  /* Get pools list flow */
  builder
    .addCase(actions.getPools.pending, (state) => {
      state.isPoolsLoading = true;
    })
    .addCase(actions.getPools.fulfilled, (state, action) => {
      state.isPoolsLoading = false;
      state.pools = action.payload;
    })
    .addCase(actions.getPools.rejected, (state) => {
      state.isPoolsLoading = false;
    })
);
