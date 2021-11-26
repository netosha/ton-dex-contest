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
