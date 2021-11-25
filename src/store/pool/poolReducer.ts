import { createReducer } from '@reduxjs/toolkit';

import { Pool, WalletPool } from '@src/types';

import * as actions from './poolActions';

export type PoolState = {
  pools: Pool[];
  isPoolsLoading: boolean;
  walletPools: {
    [poolId: string]: WalletPool;
  };
  isWalletPoolsLoading: boolean;
};

export const initialState: PoolState = {
  pools: [],
  isPoolsLoading: false,
  walletPools: {},
  isWalletPoolsLoading: false,
};

export const poolReducer = createReducer(initialState, (builder) =>
  builder
    /* Get pools list */
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

    /* Get wallet pools */
    .addCase(actions.getWalletPools.pending, (state) => {
      state.isWalletPoolsLoading = true;
    })
    .addCase(actions.getWalletPools.fulfilled, (state, action) => {
      const reducedPools = action.payload.reduce(
        (prev, cur) => ({ ...prev, [cur.id]: cur }),
        {}
      );
      return {
        ...state,
        walletPools: { ...state.walletPools, ...reducedPools },
        isWalletPoolsLoading: false,
      };
    })
    .addCase(actions.getWalletPools.rejected, (state) => {
      state.isWalletPoolsLoading = false;
    })
);
