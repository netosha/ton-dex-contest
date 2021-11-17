import React from 'react';

import cn from 'clsx';

const PoolCard: React.VFC = () => {
  return (
    <button
      className={cn(
        'group flex flex-col text-violet cursor-pointer bg-control transition-colors rounded-md h-[7.5rem] p-3',
        'hover:bg-blue hover:text-white'
      )}
    >
      <div className="flex gap-2">
        <span className="text-2xl transition-colors font-black text-violet group-hover:text-white">
          WBTC
        </span>
        <span className="text-2xl transition-colors font-black text-gray text-gray group-hover:text-white">
          /
        </span>
      </div>
      <span className="text-2xl transition-colors font-black text-violet group-hover:text-white">
        USDT
      </span>
      <div className="flex gap-2 mt-auto group-hover:text-white">
        <span>0.3%</span>
        <span>$15 123</span>
      </div>
    </button>
  );
};

export default PoolCard;
