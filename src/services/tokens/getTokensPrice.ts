import { sleep } from '@src/utils';

import { pricedTokens } from '../sampleData';

/**
 * Sample request for fetching all tokens list
 *
 * @param {number} offset - skip number from beginning
 * @param {number} limit - count of returned tokens
 * @return {Promise<Token[]>}
 */
const getTokensPrice = async (offset = 0, limit = 20) => {
  await sleep(600);
  return pricedTokens.slice(offset).slice(0, limit);
};

export default getTokensPrice;
