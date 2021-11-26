import { HTMLProps } from 'react';

export interface TokenCardProps extends HTMLProps<HTMLDivElement> {
  symbol: string;
  amount: number;
  /**
   * Rate of available tokens (from 0 to 1)
   *
   * Default = 1
   */
  available?: number;
}
