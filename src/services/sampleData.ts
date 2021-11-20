import { Pool, PricedToken } from '@src/types';
import { popularTokens } from '@src/utils';

export const pricedTokens: PricedToken[] = popularTokens.map((t) => ({
  ...t,
  price: Math.random() * 1000,
  priceChange: {
    type: Math.random() > 0.5 ? 'rise' : 'fall',
    amount: Math.random() * 10,
  },
  tradingVolume: 100 + Math.random() * 100,
}));

export const pools: Pool[] = [
  {
    id: 'cb7286c3-f71e-4cdc-a34b-1d0bed5c4506',
    volume: 4,
    totalPrice: 324,
    pair: [pricedTokens[0]!, pricedTokens[2]!],
  },
];
