import { createReducer } from '@reduxjs/toolkit';

import { Token } from '@src/types';

import * as actions from './tokenActions';

export type TokenState = {
  isLoading: boolean;
  tokens: {
    [address: string]: Token;
  };
};

export const initialState: TokenState = {
  isLoading: false,
  tokens: {},
};

export const tokenReducer = createReducer(initialState, (builder) =>
  builder
    /* Get tokens list flow */
    .addCase(actions.getTokensList.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(actions.getTokensList.fulfilled, (state, action) => {
      state.isLoading = false;
      // Load all tokens to local cache
      action.payload.forEach((x) => {
        state.tokens[x.address] = x;
      });
    })
    .addCase(actions.getTokensList.rejected, (state) => {
      state.isLoading = false;
    })
);
