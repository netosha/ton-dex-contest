import { createAsyncThunk } from '@reduxjs/toolkit';

import * as services from '@src/services';

/**
 * Fetches wallet transaction
 */
export const getAddressTransactions = createAsyncThunk(
  'transaction/getAddressTransactions',
  async ({
    address,
    offset = 0,
    limit = 20,
  }: {
    address: string;
    offset?: number;
    limit?: number;
  }) => {
    const transactions = await services.transactions.getTransactions(
      address,
      offset,
      limit
    );

    return { transactions, address, offset, limit };
  }
);
