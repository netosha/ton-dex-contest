import React from 'react';

import { NextPage } from 'next';
import Link from 'next/link';

import Chart from '@components/Chart';
import fakeData from '@components/Chart/fakeData';
import Layout from '@components/Layout';
import PriceChange from '@components/PriceChange';

const Pool: NextPage = () => {
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
          <Chart data={fakeData} />
        </div>
      </section>

      <section className="mb-2 flex flex-col gap-2">
        <h2 className="text-3xl font-black text-violet">Your liquidity</h2>
        <div className="w-full grid grid-cols-2 h-80">
          <div className="w-full h-full bg-control rounded-md">c123</div>
          <div>c123</div>
        </div>
      </section>

      <div className="w-full">
        <h2 className="text-3xl font-black text-violet">Transactions</h2>
      </div>
    </Layout>
  );
};

export default Pool;
