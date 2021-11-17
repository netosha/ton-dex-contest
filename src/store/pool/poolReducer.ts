import { createReducer } from '@reduxjs/toolkit';

import { Pool } from '@src/types';

import * as actions from './poolActions';

export type PoolState = {
  pools: {
    items: Pool[];
    isLoading: boolean;
  };
};

export const initialState: PoolState = {
  pools: {
    items: [],
    isLoading: false,
  },
};

export const poolReducer = createReducer(initialState, (builder) =>
  /* Get pools list flow */
  builder
    .addCase(actions.getPools.pending, (state) => {
      state.pools.isLoading = true;
    })
    .addCase(actions.getPools.fulfilled, (state, action) => {
      state.pools.isLoading = false;
      state.pools.items = action.payload;
    })
    .addCase(actions.getPools.rejected, (state) => {
      state.pools.isLoading = false;
    })
);
