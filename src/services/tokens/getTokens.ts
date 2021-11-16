import { Token } from '@src/types';
import { sleep } from '@src/utils';

// Sample data
const tokens: Token[] = [
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
    fees: 0.6,
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
    tradingVolume: 42,
    fees: 0.1,
  },
];

const getTokens = async (offset = 0, limit = 20) => {
  await sleep(600);
  return tokens.slice(offset).slice(0, limit);
};

export default getTokens;
