import React from 'react';

import { ArrowSmLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';

import { ViewLiquidityProps } from '@components/LiquidityManager/LiquidityManager.types';
import TokenCard from '@components/LiquidityManager/TokenCard';
import { Button, Tooltip } from '@src/ui';

const ViewLiquidity: React.VFC<ViewLiquidityProps> = ({ pool }) => {
  const { locked, share } = pool;

  return (
    <div className="flex min-h-[20rem] flex-col gap-2 max-w-[25rem] w-full">
      <Link href={`/pool/${pool.id}`}>
        <span className="cursor-pointer text-violet-40 hover:text-violet transition-colors font-bold flex gap-1 items-center">
          <ArrowSmLeftIcon className="w-4 h-4 " />
          Back to pool
        </span>
      </Link>

      <h1 className="text-2xl font-black text-violet">Manage liquidity</h1>
      <div className="grid grid-rows-2 gap-4 w-full ">
        <TokenCard symbol={locked[0].symbol} amount={locked[0].amount!} />
        <TokenCard symbol={locked[1].symbol} amount={locked[1].amount!} />
      </div>
      <div className="flex flex-col mt-2 gap-2">
        <span className="text-violet text-violet-60">
          Your pool share: <b className="text-violet">~{share}%</b>
        </span>
        <span className="flex gap-1 text-violet text-violet-60">
          Rewards:
          <Tooltip
            position="top"
            content={
              <div className="bg-control flex flex-col gap-1 text-dark w-[8rem] py-2 px-4 rounded-md">
                <span className="font-bold text-sm whitespace-nowrap">
                  1.51 {locked[0].symbol}
                </span>
                <span className="font-bold text-sm whitespace-nowrap">
                  21 {locked[1].symbol}
                </span>
              </div>
            }
          >
            <b className="text-violet">$45.12</b>
          </Tooltip>
        </span>
      </div>
      <div className="grid w-full grid-cols-2 mt-2 gap-4">
        <Link href={`/pool/${pool.id}/manage/remove`}>
          <Button className="w-full" danger>
            Remove
          </Button>
        </Link>
        <Link href={`/pool/${pool.id}/manage/add`}>
          <Button className="w-full">Add</Button>
        </Link>
      </div>
    </div>
  );
};

export default ViewLiquidity;
