import { createReducer } from '@reduxjs/toolkit';

import { Pool, WalletPool, DetailedPool, PoolGraphData } from '@src/types';

import * as actions from './poolActions';

export type PoolState = {
  /**
   * Loaded pools from pools list
   */
  pools: Pool[];
  isPoolsLoading: boolean;

  /**
   * Pool with additional info (like graphs, transactions, etc.)
   *
   * If detailed pool is null - it's loading
   */
  detailedPools: {
    [id: string]: DetailedPool | null;
  };

  /**
   * Pool graph data
   *
   * If it's null - it's loading
   */
  graphData: {
    [poolId: string]: PoolGraphData | null;
  };

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
  detailedPools: {},
  graphData: {},
};

export const poolReducer = createReducer(initialState, (builder) =>
  /* Get pools list flow */
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

    /* Get pool's graph data */
    .addCase(actions.getPoolGraphData.pending, (state, action) => {
      state.graphData[action.meta.arg] = null;
    })
    .addCase(actions.getPoolGraphData.fulfilled, (state, action) => {
      const { id, poolGraphData } = action.payload;
      state.graphData[id] = poolGraphData;
    })
    .addCase(actions.getPoolGraphData.rejected, (state, action) => {
      // TODO: Replace it with destructing object
      delete state.graphData[action.meta.arg];
    })

    /* Get detailed pool's data */
    .addCase(actions.getPool.pending, (state, action) => {
      const id = action.meta.arg;
      state.detailedPools[id] = null;
    })
    .addCase(actions.getPool.fulfilled, (state, action) => {
      const { id, detailedPool } = action.payload;
      state.detailedPools[id] = detailedPool;
    })
    .addCase(actions.getPool.rejected, () => {
      console.log('wrong id');
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
