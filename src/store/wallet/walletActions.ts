import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { sleep } from '@src/utils';

/**
 * Connect wallet mock
 */
export const connectWallet = createAsyncThunk(
  'wallet/connectWallet',
  async (address: string) => {
    await sleep(1000);
    return { address };
  }
);

/**
 * Resets wallet store to initial value
 */
export const resetWallet = createAction('wallet/resetWallet', () => {
  return { payload: null };
});
