import { sleep } from '@src/utils';

import { pools } from '../sampleData';

/**
 * Sample request for fetching all pools list
 *
 * @param {number} offset - skip number from beginning
 * @param {number} limit - count of returned tokens
 * @return {Promise<Pool[]>}
 */
const getPools = async (offset = 0, limit = 20) => {
  await sleep(850);
  return pools.slice(offset).slice(0, limit);
};

export default getPools;
