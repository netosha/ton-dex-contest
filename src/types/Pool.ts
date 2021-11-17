import { Token } from './Token';

export type Pool = {
  id: string;

  /**
   * Total trade amount over past 24h (in USD)
   */
  volume: number;

  /**
   * Total USD locked in pool
   */
  totalPrice: number;

  /**
   * Array of 2 tokens
   *
   * Note: it's simplified model of pair. It could significantly change in future
   */
  pair: [Token, Token];
};
