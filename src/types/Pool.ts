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
  graphData?: any | null;
}

export interface WalletPool extends Pool {
  ownerAddress: string;
  fee: number;
  share: number;

  /**
   * Locked tokens pair
   */
  locked: [CountableToken, CountableToken];
}
