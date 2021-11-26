import { HTMLProps } from 'react';

import { WalletPool } from '@src/types';

export interface PoolCardProps extends HTMLProps<HTMLAnchorElement> {
  pool: WalletPool;
}
