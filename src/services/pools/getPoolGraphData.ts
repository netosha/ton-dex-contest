import { sleep } from '@src/utils';

import { getPoolGraphFakeData } from '../sampleData';

/**
 * Sample request for fetching pool data for graph
 *
 * @return {Promise<PoolGraphData>}
 */
const getPoolGraphData = async () => {
  await sleep(850);
  return getPoolGraphFakeData();
};

export default getPoolGraphData;
