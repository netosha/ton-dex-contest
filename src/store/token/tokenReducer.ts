import { createReducer } from '@reduxjs/toolkit';

import { PricedToken, Token } from '@src/types';
import { popularTokens } from '@src/utils';

import * as actions from './tokenActions';

export type TokenState = {
  tokens: {
    [address: string]: Token;
  };
  pricedTokens: {
    [address: string]: PricedToken;
  };
  isPricedTokensLoading: boolean;
};

export const initialState: TokenState = {
  isPricedTokensLoading: false,
  tokens: popularTokens.reduce(
    (prev, cur) => ({ ...prev, [cur.address]: cur }),
    {}
  ),
  pricedTokens: {},
};

export const tokenReducer = createReducer(initialState, (builder) =>
  builder
    /* Get tokens list */
    .addCase(actions.getTokensPrice.pending, (state) => {
      state.isPricedTokensLoading = true;
    })
    .addCase(actions.getTokensPrice.fulfilled, (state, action) => {
      state.isPricedTokensLoading = false;
      // Load all tokens to local cache
      action.payload.forEach((x) => {
        state.pricedTokens[x.address] = x;
      });
    })
    .addCase(actions.getTokensPrice.rejected, (state) => {
      state.isPricedTokensLoading = false;
    })

    /* Add unknown token */
    .addCase(actions.addNewToken.fulfilled, (state, action) => {
      const { name, symbol, shardChainId, address } = action.payload;
      state.tokens[address] = {
        name,
        symbol,
        shardChainId,
        address,
      };
    })
);
