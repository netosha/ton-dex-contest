import { createAsyncThunk } from '@reduxjs/toolkit';

import * as services from '@src/services';

/**
 * Fetch tokens list
 */
export const getTokensList = createAsyncThunk(
  'token/getTokensList',
  async ({ offset = 0, limit = 20 }: { offset?: number; limit?: number }) => {
    return services.tokens.getTokens(offset, limit);
  }
);
