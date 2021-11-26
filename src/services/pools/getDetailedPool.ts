import { sleep } from '@src/utils';

import { detailedPools } from '../sampleData';

const getDetailedPool = async (id: string) => {
  await sleep(850);
  const pool = detailedPools[id];
  if (!pool) {
    throw new Error(`Pool with ${id} not found`);
  }
  return pool;
};

export default getDetailedPool;
