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

export interface DetailedPool extends Pool {
  /**
   * All reward fees for past 24h
   */
  fees: number;
}

export interface WalletPool extends Pool {
  ownerAddress: string;

  /**
   * Pool's fee level
   */
  fee: number;
  share: number;

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
