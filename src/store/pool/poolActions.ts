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
