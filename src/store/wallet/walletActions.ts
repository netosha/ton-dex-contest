import { createAsyncThunk } from '@reduxjs/toolkit';

import delay from '@src/utils/delay';

export const connectWallet = createAsyncThunk(
  'wallet/connectWallet',
  async (address: string) => {
    await delay(1000);
    return { address };
  }
);
