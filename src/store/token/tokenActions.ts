import { createAsyncThunk } from '@reduxjs/toolkit';

import { TONRC20 } from '@src/contracts/TONRC20';
import * as services from '@src/services';
import { Token } from '@src/types';

/**
 * Fetch tokens list
 */
export const getTokensPrice = createAsyncThunk(
  'token/getTokensList',
  async ({ offset = 0, limit = 20 }: { offset?: number; limit?: number }) => {
    return services.tokens.getTokensPrice(offset, limit);
  }
);

/**
 * Fetch tokens list
 */
export const addUnknownToken = createAsyncThunk(
  'token/addUnknownToken',
  async (address: string) => {
    const contract = new TONRC20(address, 'provider');
    const symbol = contract.symbol();
    const name = contract.name();
    const shardChainId = Math.floor(Math.ceil(Math.random() * 10000));
    return {
      name: await name,
      symbol: await symbol,
      shardChainId,
      address,
    } as Token;
  }
);
