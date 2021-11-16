export type Token = {
  /**
   * Raw token address in blockchain (ex: 0:F013fW2...)
   *
   * TODO: should be refactored to something like this:
   * https://github.com/ex3ndr/ton/blob/4de39dd07aac35d60e3e6746c103b11a918d3218/src/address/Address.ts#L118
   */
  address: string;

  /**
   * Token full name (ex: Bitcoin, Ethereum, TON, etc.)
   */
  name: string;

  /**
   * Token ticker (ex: BTC, ETH, TONCOIN, etc.)
   */
  ticker: string;

  /**
   * Token's shardchain id
   */
  shardChainId: number;

  /**
   * Current price in USD
   */
  price: number;

  /**
   * Price movement over the past 24h (in percents)
   *
   * Note: This is hardcoded version to fit table mockup, not for real use
   */
  priceChange: {
    type: 'rise' | 'fall';
    amount: number;
  };

  /**
   * Amount of all trades over the past 24h
   */
  tradingVolume: number;

  /**
   * Amount of all fees over the past 24h
   */
  fees: number;
};