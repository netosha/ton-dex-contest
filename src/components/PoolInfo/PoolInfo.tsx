import React from 'react';

import PriceChange from '@components/PriceChange';
import { formatNumber } from '@src/utils';

import { PoolInfoProps } from './PoolInfo.types';

const PoolInfo: React.VFC<PoolInfoProps> = ({ pool }) => {
  if (!pool) {
    return (
      <div className="grid grid-rows-3 gap-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="rounded-md animate-shine" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-rows-3 gap-4">
      <div className="flex flex-col bg-control rounded-md w-full p-3 relative">
        <span className="text-violet-50 z-20 font-bold	leading-none">
          Total Liquidity
        </span>
        <span className="text-blue font text-3xl mt-auto leading-none font-extrabold">
          {formatNumber(pool!.totalLocked)}
        </span>
        <div className="absolute right-3 bottom-3">
          <PriceChange type={'rise'} value={5.12} />
        </div>
      </div>
      <div className="flex flex-col bg-control rounded-md w-full p-3 relative">
        <span className="text-violet-50 z-20 font-bold	leading-none">
          Volume
        </span>
        <span className="text-blue font text-3xl mt-auto leading-none font-extrabold">
          {formatNumber(pool!.volume)}
        </span>
        <div className="absolute right-3 bottom-3">
          <PriceChange type={'fall'} value={11.12} />
        </div>
      </div>
      <div className="flex flex-col bg-control rounded-md w-full p-3 relative">
        <span className="text-violet-50 z-20 font-bold	leading-none">Fees</span>
        <span className="text-blue font text-3xl mt-auto leading-none font-extrabold">
          ${formatNumber(pool.fees)}
        </span>
        <div className="absolute right-3 bottom-3">
          <PriceChange type={'rise'} value={5.12} />
        </div>
      </div>
    </div>
  );
};

export default PoolInfo;
