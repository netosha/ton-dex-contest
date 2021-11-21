import { createReducer } from '@reduxjs/toolkit';

import { Pool } from '@src/types';

import * as actions from './poolActions';

export type PoolState = {
  pools: Pool[];
  isPoolsLoading: boolean;
};

export const initialState: PoolState = {
  pools: [],
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
