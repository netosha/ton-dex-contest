import React from 'react';

import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Chart from '@components/Chart';
import Layout from '@components/Layout';
import PriceChange from '@components/PriceChange';
import { useDispatch, useSelector } from '@src/hooks';
import { getPoolGraphData, selectPoolGraphData } from '@store/pool';
import { Button } from '@src/ui';

const Pool: NextPage = () => {
  const { query } = useRouter();
  const { id } = query
  const graphData = useSelector(selectPoolGraphData(id as string));
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!graphData) {
      dispatch(getPoolGraphData(id as string));
    }
  }, []);

  return (
    <Layout>
      <section className="text-4xl mt-4 font-black text-violet">
        <Link href="/tokens">
          <a className="transition-colors hover:text-blue">WBTC</a>
        </Link>
        <span className="text-violet-30 mx-2">/</span>
        <Link href="/tokens">
          <a className="transition-colors hover:text-blue">WETH</a>
        </Link>
      </section>
      <section className="py-2">
        <Link href={`/pool/${id}/manage`}>
          <Button className="font-bold">Manage liquidity</Button>
        </Link>
      </section>
      <section className="min-h-[20rem] w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="w-full grid gap-4 col-span-1">
          <div className="flex flex-col bg-control rounded-md w-full p-3 relative">
            <span className="text-violet-50 z-20 font-bold	leading-none">
              Total Liquidity
            </span>
            <span className="text-blue font text-3xl mt-auto leading-none font-extrabold">
              $1 424 123
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
              $412 124
            </span>
            <div className="absolute right-3 bottom-3">
              <PriceChange type={'fall'} value={11.12} />
            </div>
          </div>
          <div className="flex flex-col bg-control rounded-md w-full p-3 relative">
            <span className="text-violet-50 z-20 font-bold	leading-none">
              Fees
            </span>
            <span className="text-blue font text-3xl mt-auto leading-none font-extrabold">
              $4 412
            </span>
            <div className="absolute right-3 bottom-3">
              <PriceChange type={'rise'} value={5.12} />
            </div>
          </div>
        </div>

        <div className="bg-control rounded-md col-span-1 md:col-span-2 p-3 h-[20rem]">
          <Chart data={graphData} />
        </div>
      </section>

      <div className="w-full">
        <h2 className="text-3xl font-black text-violet">Transactions</h2>
      </div>
    </Layout>
  );
};

export default Pool;
