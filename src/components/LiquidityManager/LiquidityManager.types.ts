import { HTMLProps } from 'react';

import { WalletPool } from '@src/types';

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

export interface ViewLiquidityProps {
  pool: WalletPool;
}

export interface RemoveLiquidityProps {
  pool: WalletPool;
}
