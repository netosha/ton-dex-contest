import { Pool, Token } from '@src/types';

export const tokens: Token[] = [
  {
    address:
      '13:75F58C6069A00B941C270E35C58707EF9F8CB64BEA54B0DB206239DB944FFDB1',
    name: 'Wrapped Bitcoin',
    ticker: 'WBTC',
    shardChainId: 13,
    price: 65536,
    priceChange: {
      type: 'rise',
      amount: 4.12,
    },
    tradingVolume: 142,
  },
  {
    address:
      '14:FA74CA6CF89F310F0B30D5C65A34DD50C2DB0F08D682DDBEB4E594994E17DABE',
    name: 'Wrapped ETH',
    ticker: 'WETH',
    shardChainId: 14,
    price: 4096,
    priceChange: {
      type: 'rise',
      amount: 2.12,
    },
    tradingVolume: 682,
  },
  {
    address:
      '14:FA74CA6CF89F310F0B30D5C65A34DD50C2DB0F08D682DDBEB4E594994E17DABE',
    name: 'Wrapped ETH',
    ticker: 'WETH',
    shardChainId: 14,
    price: 4096,
    priceChange: {
      type: 'rise',
      amount: 2.12,
    },
    tradingVolume: 401,
  },
  {
    address:
      '15:4CC353FBBFB91E4D61E2DDE35C747BFF12A8254D2E77F88B23745078A5A5B7E1',
    name: 'Dai Stablecoin',
    ticker: 'DAI',
    shardChainId: 15,
    price: 1,
    priceChange: {
      type: 'rise',
      amount: 0,
    },
    tradingVolume: 398,
  },
];

export const pools: Pool[] = [
  {
    id: 'cb7286c3-f71e-4cdc-a34b-1d0bed5c4506',
    volume: 4,
    totalPrice: 324,
    pair: [tokens[0]!, tokens[2]!],
  },
];
