import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { sleep } from '@src/utils';

/**
 * Connect wallet mock
 */
export const connectWallet = createAsyncThunk(
  'wallet/connectWallet',
  async () => {
    await sleep(1000);
    return {
      address: 'EQCP_Es4UsKIQdU2Hid4HVFA3f5YKls9tMzxQTJz9r7l3_nO',
      balance: Math.random() * 10,
    };
  }
);

/**
 * Resets wallet store to initial value
 */
export const resetWallet = createAction('wallet/resetWallet');
