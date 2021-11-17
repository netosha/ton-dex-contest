import { sleep } from '@src/utils';

import { tokens } from '../sampleData';

/**
 * Sample request for fetching all tokens list
 *
 * @param {number} offset - skip number from beginning
 * @param {number} limit - count of returned tokens
 * @return {Promise<Token[]>}
 */
const getTokens = async (offset = 0, limit = 20) => {
  await sleep(600);
  return tokens.slice(offset).slice(0, limit);
};

export default getTokens;
