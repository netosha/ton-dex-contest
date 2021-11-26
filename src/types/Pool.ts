import { CountableToken, Token } from './Token';

export interface Pool {
  id: string;

  /**
   * Total trade amount over past 24h (in USD)
   */
  volume: number;

  /**
   * Overall USD locked in pool
   */
  totalLocked: number;

  /**
   * Array of 2 tokens
   *
   * Note: it's simplified model of pair. It could significantly change in future
   */
  pair: [Token, Token];
}

export interface WalletPool extends Pool {
  ownerAddress: string;
  fee: number;

  /**
   * Wallet's USD locked in pool
   */
  walletLocked: number;

  /**
   * Locked tokens pair
   */
  locked: [CountableToken, CountableToken];
}

// Todo: Make types for other properties
export interface PoolGraphData {
  columns: Array<Array<string | Date | number>>;
  types: any;
  names: any;
  colors: any;
}
