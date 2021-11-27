import { createAsyncThunk } from '@reduxjs/toolkit';

import * as services from '@src/services';

/**
 * Fetch pools list
 */
export const getPools = createAsyncThunk(
  'pool/getPools',
  async ({ offset = 0, limit = 20 }: { offset?: number; limit?: number }) => {
    return services.pools.getPools(offset, limit);
  }
);

export const getWalletPools = createAsyncThunk(
  'pool/getWalletPools',
  async ({ offset = 0, limit = 20 }: { offset?: number; limit?: number }) => {
    return services.pools.getWalletPools(offset, limit);
  }
);

/**
 * Fetch pool data for graph
 */
export const getPoolGraphData = createAsyncThunk(
  'pool/getPoolGraphData',
  async (id: string) => {
    const poolGraphData = await services.pools.getPoolGraphData();
    return { id, poolGraphData };
  }
);

export const getPool = createAsyncThunk('pool/getPool', async (id: string) => {
  const detailedPool = await services.pools.getDetailedPool(id);
  return { id, detailedPool };
});
