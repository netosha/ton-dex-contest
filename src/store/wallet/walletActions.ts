import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { TONRC20 } from '@src/contracts/TONRC20';
import { WalletV4 } from '@src/contracts/Wallet';

// eslint-disable-next-line import/no-cycle
import store from '../store';

/**
 * Connect wallet mock
 */
export const connectWallet = createAsyncThunk(
  'wallet/connectWallet',
  async () => {
    const wallet = new WalletV4(
      Buffer.from('pub', 'utf8'),
      Buffer.from('priv', 'utf8')
    );

    const address = wallet.myAddress();
    const balance = wallet.getBalance();

    return {
      address: await address,
      balance: await balance,
    };
  }
);

/**
 * Fetches token balance
 *
 * For example, wallet balance of ERC20-like token
 */
export const getTokenBalance = createAsyncThunk(
  'wallet/tokenBalance',
  async (tokenAddress: string) => {
    // https://stackoverflow.com/a/35674575
    const { wallet } = store.getState();

    if (wallet.status !== 'connected' || !wallet.address) {
      console.log('123');
      throw new Error(
        'Failed to fetch token balance, because wallet is not provided'
      );
    }

    const tokenContract = new TONRC20(tokenAddress, 'provider');
    const balance: number = await tokenContract.balanceOf(wallet.address);

    return { balance, tokenAddress };
  }
);

/**
 * Resets wallet store to initial value
 */
export const resetWallet = createAction('wallet/resetWallet');
