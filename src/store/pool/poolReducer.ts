import { createReducer } from '@reduxjs/toolkit';

import { Pool, WalletPool, PoolGraphData } from '@src/types';

import * as actions from './poolActions';

export type PoolState = {
  pools: Pool[];
  walletPools: WalletPool[];
  poolGraphs: {
    [id: string]: PoolGraphData;
  };
  isPoolsLoading: boolean;
};

export const initialState: PoolState = {
  pools: [],
  walletPools: [],
  poolGraphs: {},
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

    /* Get pool graph data */
    .addCase(actions.getPoolGraphData.fulfilled, (state, action) => {
      const { id, poolGraphData } = action.payload;
      state.poolGraphs[id] = poolGraphData;
    })
);
