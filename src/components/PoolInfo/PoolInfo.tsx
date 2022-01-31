import React from 'react';

import PriceChange from '@components/PriceChange';
import { formatNumber } from '@src/utils';

import { InfoCardProps, PoolInfoProps } from './PoolInfo.types';

const InfoCard: React.VFC<InfoCardProps> = ({ title, value }) => {
  return (
    <div className="flex flex-col bg-control rounded-md w-full p-3 relative">
      <span className="text-violet-50 z-20 font-bold	leading-none pb-4">
        {title}
      </span>
      <span className="text-blue font text-3xl mt-auto leading-none font-extrabold">
        {typeof value === 'number' ? formatNumber(value) : value}
      </span>
      <div className="absolute right-3 bottom-3">
        <PriceChange type={'rise'} value={Math.random() * 10} />
      </div>
    </div>
  );
};

const PoolInfo: React.VFC<PoolInfoProps> = ({ pool }) => {
  if (!pool) {
    return (
      <div className="grid grid-rows-3 gap-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="h-full rounded-md animate-shine" />
        ))}
      </div>
    );
  }

  const { tokensLocked, volume, fees } = pool;

  return (
    <div className="grid grid-rows-3 gap-4">
      <div className="flex gap-4">
        <InfoCard
          title={`${tokensLocked[0].symbol} locked`}
          value={tokensLocked[0].amount}
        />
        <InfoCard
          title={`${tokensLocked[1].symbol} locked`}
          value={tokensLocked[1].amount}
        />
      </div>
      <InfoCard title="Volume" value={volume} />
      <InfoCard title="Fees" value={`${formatNumber(fees)}$`} />
    </div>
  );
};

export default PoolInfo;
