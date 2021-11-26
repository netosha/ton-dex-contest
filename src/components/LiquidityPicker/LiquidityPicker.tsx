import React from 'react';

import { ArrowSmLeftIcon } from '@heroicons/react/solid';

import TokenCard from '@components/LiquidityPicker/TokenCard';
import { Button, Range } from '@src/ui';

const LiquidityPicker: React.VFC = () => {
  const [tab, setTab] = React.useState<'add' | 'remove' | 'view'>('view');

  const [removePercent, setRemovePercent] = React.useState<number>(25);
  const removeRate = removePercent / 100;

  if (tab === 'view') {
    return (
      <div className="flex min-h-[20rem] flex-col gap-3 max-w-[25rem] w-full">
        <h1 className="text-2xl font-black text-violet">Manage liquidity</h1>

        <div className="grid grid-rows-2 gap-4 w-full ">
          <TokenCard symbol={'WBTC'} amount={0.123} />
          <TokenCard symbol={'WBTC'} amount={0.123} />
        </div>
        <div className="flex flex-col mt-2 gap-2">
          <span className="text-violet text-violet-60">
            Your pool share: <b className="text-violet">~0.2%</b>
          </span>
          <span className="text-violet text-violet-60">
            Rewards: <b className="text-violet">$45.12</b>
          </span>
        </div>
        <div className="grid w-full grid-cols-2 mt-2 gap-4">
          <Button className="w-full" danger onClick={() => setTab('remove')}>
            Remove
          </Button>
          <Button className="w-full">Add</Button>
        </div>
      </div>
    );
  }

  if (tab === 'remove') {
    return (
      <div className="flex min-h-[20rem] flex-col gap-3 max-w-[25rem] w-full">
        <div className="flex gap-2 items-center text-violet">
          <ArrowSmLeftIcon
            className="h-6 w-6 hover:text-blue transition-colors cursor-pointer"
            onClick={() => setTab('view')}
          />
          <h1 className="text-2xl font-black">Remove liquidity</h1>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full ">
          <TokenCard
            symbol={'WBTC'}
            amount={0.123}
            available={1 - removeRate}
          />
          <TokenCard
            symbol={'WBTC'}
            amount={0.123}
            available={1 - removeRate}
          />
        </div>
        <div>
          <span className="text-4xl text-blue font-extrabold">
            {removePercent}%
          </span>
          <Range
            onChange={(e) => setRemovePercent(Number(e.target.value))}
            value={removePercent}
            min={0}
            max={100}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-extrabold text-violet">Removed amount</span>
          <div className="flex gap-1 text-sm text-violet-60 font-bold">
            <span className="">WBTC:</span>
            <span className="">{0.123 * removeRate}</span>
          </div>
          <div className="flex gap-1 text-sm text-violet-60 font-bold">
            <span className="">WBTC:</span>
            <span className="">{0.123 * removeRate}</span>
          </div>
        </div>

        <Button danger>Remove</Button>
      </div>
    );
  }

  return null;
};

export default LiquidityPicker;
