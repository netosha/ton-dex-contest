import React from 'react';

import cn from 'clsx';

import { TokenCardProps } from './LiquidityManager.types';

const TokenCard: React.VFC<TokenCardProps> = (props) => {
  const { symbol, amount, className, available = 1, ...rest } = props;
  return (
    <div
      className={cn(
        'flex flex-col relative p-4 overflow-hidden rounded-md bg-gray transition-colors text-white',
        className
      )}
      {...rest}
    >
      <div
        style={{ width: `${available * 100}%`, zIndex: 5 }}
        className="h-full left-0 rounded-md top-0 absolute bg-blue"
      />
      <span className="font-extrabold z-10 text-2xl filter contrast-125">
        {symbol}
      </span>
      <div className="flex font-bold w-full z-10 mt-auto">
        <span className="filter contrast-125">
          {(amount * available).toString().slice(0, 10)}
        </span>
      </div>
    </div>
  );
};

export default TokenCard;
