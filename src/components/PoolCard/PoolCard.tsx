import React from 'react';

import cn from 'clsx';

import { PoolCardProps } from './PoolCard.types';

const PoolCard: React.VFC<PoolCardProps> = (props) => {
  const { pool, className, ...rest } = props;
  const { pair, fee } = pool;
  const amount = 45123;
  return (
    <a
      className={cn(
        'group flex flex-col text-violet cursor-pointer bg-control transition-colors rounded-md h-[7.5rem] p-3',
        'hover:bg-blue hover:text-white',
        className
      )}
      {...rest}
    >
      <div className="flex gap-2">
        <span className="text-2xl transition-colors font-black text-violet group-hover:text-white">
          {pair[0].symbol}
        </span>
        <span className="text-2xl transition-colors font-black text-gray text-gray group-hover:text-white">
          /
        </span>
      </div>
      <span className="text-2xl transition-colors font-black text-violet group-hover:text-white">
        {pair[1].symbol}
      </span>
      <div className="flex gap-2 mt-auto group-hover:text-white">
        <span>{fee}%</span>
        <span>${amount.toLocaleString()}</span>
      </div>
    </a>
  );
};

export default PoolCard;
