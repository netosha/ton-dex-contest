import React from 'react';

import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '@components/Layout';
import ManageButton from '@components/ManageButton';
import PoolInfo from '@components/PoolInfo';
import { useDispatch, useSelector } from '@src/hooks';
import { getPool, selectDetailedPool } from '@store/pool';
import { selectWallet } from '@store/wallet';

const Pool: NextPage = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { id } = query;
  const { status, address } = useSelector(selectWallet);
  const pool = useSelector((state) => selectDetailedPool(state, id as string));

  React.useEffect(() => {
    dispatch(getPool(id as string));
  }, []);

  return (
    <Layout>
      <section className="text-4xl mt-4 font-black text-violet">
        {pool ? (
          <>
            <Link href="/tokens">
              <a className="transition-colors hover:text-blue">
                {pool.pair[0].symbol}
              </a>
            </Link>
            <span className="text-violet-30 mx-2">/</span>
            <Link href="/tokens">
              <a className="transition-colors hover:text-blue">
                {pool.pair[1].symbol}
              </a>
            </Link>
          </>
        ) : (
          <div className="h-10 my-1 w-64 animate-shine rounded-md" />
        )}
      </section>
      <section>
        <ManageButton pool={pool} address={address} status={status} />
      </section>

      <section className="min-h-[20rem] w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="w-full grid gap-4 col-span-1">
          <PoolInfo pool={pool} />
        </div>
        <div className="bg-control rounded-md col-span-1 md:col-span-2 p-3 h-[20rem]">
          {/* <Chart  /> */}
        </div>
      </section>

      <div className="w-full">
        <h2 className="text-3xl font-black text-violet">Transactions</h2>
      </div>
    </Layout>
  );
};

// Little trick to pass query params in router without re-rendering
// Check query logic before remove and remove, if needed
// https://nextjs.org/docs/api-reference/next/router#router-object
export async function getServerSideProps() {
  return { props: {} };
}

export default Pool;
