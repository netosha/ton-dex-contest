import { TransactionSettings } from '@components/TokenPicker/TokenPicker.types';
import {
  PricedToken,
  PoolGraphData,
  WalletPool,
  DetailedPool,
} from '@src/types';
import { popularTokens } from '@src/utils';

export const DEFAULT_TRANSACTIONS_SETTINGS: TransactionSettings = {
  slippage: 2,
  deadline: 5,
};

export const pricedTokens: PricedToken[] = popularTokens.map((t) => ({
  ...t,
  price: Math.random() * 1000,
  priceChange: {
    type: Math.random() > 0.5 ? 'rise' : 'fall',
    amount: Math.random() * 10,
  },
  tradingVolume: Math.random() * 100000000,
}));

export const pools: DetailedPool[] = [
  {
    id: 'cb7286c3-f71e-4cdc-a34b-1d0bed5c4506',
    volume: Math.random() * 10000000,
    totalLocked: Math.random() * 1000000000,
    fees: Math.random() * 10000,
    pair: [pricedTokens[0]!, pricedTokens[2]!],
    tokensLocked: [
      { ...pricedTokens[0]!, amount: Math.random() * 100000000 },
      { ...pricedTokens[2]!, amount: Math.random() * 1000000 },
    ],
  },
  {
    id: '5eba28cb-0976-425f-bbcb-38e5c69b4f58',
    volume: Math.random() * 10000000,
    totalLocked: Math.random() * 1000000000,
    fees: Math.random() * 10000,
    pair: [pricedTokens[0]!, pricedTokens[1]!],
    tokensLocked: [
      { ...pricedTokens[0]!, amount: Math.random() * 100000000 },
      { ...pricedTokens[1]!, amount: Math.random() * 1000000 },
    ],
  },
  {
    id: 'ef4bf1aa-e695-4919-b76c-5c0ad8c1cb85',
    volume: Math.random() * 10000000,
    fees: Math.random() * 10000,
    totalLocked: Math.random() * 1000000000,
    pair: [pricedTokens[0]!, pricedTokens[3]!],
    tokensLocked: [
      { ...pricedTokens[0]!, amount: Math.random() * 100000000 },
      { ...pricedTokens[3]!, amount: Math.random() * 1000000 },
    ],
  },
  {
    id: '018b16f7-1715-4dbc-867e-6d11399daf8e',
    volume: Math.random() * 10000000,
    totalLocked: Math.random() * 1000000000,
    fees: Math.random() * 10000,
    pair: [pricedTokens[1]!, pricedTokens[3]!],
    tokensLocked: [
      { ...pricedTokens[1]!, amount: Math.random() * 100000000 },
      { ...pricedTokens[3]!, amount: Math.random() * 1000000 },
    ],
  },
];

// Todo: replace with ok one
export function poolGraphData() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setMinutes(0);

  const dates = Array.from({ length: 288 }, () => {
    yesterday.setMinutes(yesterday.getMinutes() + 5);
    const date = new Date(yesterday);
    return Date.parse(date.toString());
  });
  // @ts-ignore:next-line
  dates.unshift('x');
  let x = 0;
  const arrayY0 = Array.from({ length: 288 }, () => {
    x += Math.random() * 100 - 50;
    return Math.abs(x);
  });
  // @ts-ignore:next-line
  arrayY0.unshift('y0');

  const fakeData: PoolGraphData = {
    columns: [dates, arrayY0],
    types: {
      y0: 'line',
      x: 'x',
    },
    names: {
      y0: 'TONCOIN',
    },
    colors: {
      y0: '#0088cc',
    },
  };
  return fakeData;
}

export const walletPools: WalletPool[] = [
  {
    ...pools[0]!,
    ownerAddress: 'EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N',
    fee: 0.2,
    share: 0.001,
    locked: [
      {
        ...pools[0]!.pair[0]!,
        amount: 15,
      },
      {
        ...pools[0]!.pair[1]!,
        amount: 200,
      },
    ],
  },
  {
    ...pools[1]!,
    ownerAddress: 'EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N',
    fee: 0.1,
    share: 0.0012,
    locked: [
      {
        ...pools[1]!.pair[0]!,
        amount: 321,
      },
      {
        ...pools[1]!.pair[1]!,
        amount: 100,
      },
    ],
  },
];

export const detailedPools: {
  [id: string]: DetailedPool;
} = pools.reduce(
  (prev, cur) => ({
    ...prev,
    [cur.id!]: { ...cur!, fees: Math.random() * 1000 },
  }),
  {}
);
