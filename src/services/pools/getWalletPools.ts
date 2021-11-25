import { walletPools } from '@src/services/sampleData';
import { sleep } from '@src/utils';

const getWalletPools = async (offset = 0, limit = 20) => {
  await sleep(3500);

  return walletPools.slice(offset).slice(0, limit);
};

export default getWalletPools;
