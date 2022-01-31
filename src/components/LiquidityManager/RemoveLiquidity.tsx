import React from 'react';

import { ArrowSmLeftIcon } from '@heroicons/react/solid';
import cn from 'clsx';
import Link from 'next/link';

import TokenCard from '@components/LiquidityManager/TokenCard';
import { Button, Range } from '@src/ui';

import { RemoveLiquidityProps } from './LiquidityManager.types';

const RemoveLiquidity: React.VFC<RemoveLiquidityProps> = ({
  pool,
  onRemove,
}) => {
  const { locked } = pool;

  const [removePercent, setRemovePercent] = React.useState<number>(0);
  const removeRate = removePercent / 100;

  return (
    <div className="flex min-h-[20rem] flex-col gap-3 max-w-[25rem] w-full">
      <div className="flex gap-2 items-center text-violet">
        <Link passHref={true} href={`/pool/${pool.id}/manage`}>
          <ArrowSmLeftIcon className="h-6 w-6 hover:text-blue transition-colors cursor-pointer" />
        </Link>
        <h1 className="text-2xl font-black">Remove liquidity</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full ">
        <TokenCard
          symbol={locked[0].symbol}
          amount={locked[0].amount!}
          available={1 - removeRate}
        />
        <TokenCard
          symbol={locked[1].symbol}
          amount={locked[1].amount!}
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
      <div className="grid gap-4 grid-cols-4">
        {[25, 50, 75, 100].map((percent) => (
          <button
            key={percent}
            onClick={() => setRemovePercent(percent)}
            className={cn(
              'py-2 px-4 font-extrabold transition-colors leading-none rounded-md bg-transparent',
              removePercent === percent
                ? 'bg-transparent shadow-border-blue  text-blue'
                : 'shadow-border-lightgray  text-gray '
            )}
          >
            {percent}%
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-extrabold text-violet">Removed amount</span>
        <div className="flex gap-1 text-sm text-violet-60 font-bold">
          <span>{locked[0].symbol}</span>
          <span className="text-violet">{locked[0].amount! * removeRate}</span>
        </div>
        <div className="flex gap-1 text-sm text-violet-60 font-bold">
          <span>{locked[1].symbol}</span>
          <span className="text-violet">{locked[1].amount! * removeRate}</span>
        </div>
      </div>

      <Button
        onClick={onRemove}
        danger={removePercent > 0}
        disabled={removePercent === 0}
      >
        Remove
      </Button>
    </div>
  );
};

export default RemoveLiquidity;
