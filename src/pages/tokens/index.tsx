import React from 'react';

import { NextPage } from 'next';

import Layout from '@components/Layout';
import PriceChange from '@components/PriceChange';
import Table, { Column, OrderBy } from '@components/Table';
import useDispatch from '@hooks/useDispatch';
import useSelector from '@hooks/useSelector';
import { getTokensPrice, selectToken } from '@store/token';

const columns = [
  { key: 'position', label: '' },
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price' },
  { key: 'priceChange', label: 'Price Change' },

  { key: 'volume', label: 'Volume' },
];

const Tokens: NextPage = () => {
  const { pricedTokens, isPricedTokensLoading } = useSelector(selectToken);
  const dispatch = useDispatch();

  const [orderBy, setOrderBy] = React.useState<null | OrderBy>(null);

  // TODO: Make it as separate function
  const rows = isPricedTokensLoading
    ? []
    : Object.values(pricedTokens).map((t, i) => ({
        id: t.address,
        position: i + 1,
        name: (
          <span className="flex gap-1">
            {t.name} <span className="text-violet-50">{t.symbol}</span>
          </span>
        ),
        price: <span>${t.price.toFixed(2)}</span>,
        priceChange: (
          <PriceChange type={t.priceChange.type} value={t.priceChange.amount} />
        ),
        volume: `${t.tradingVolume.toFixed(2)}m`,
      }));

  const handleColumnClick = (c: Column) => {
    if (orderBy === null) {
      setOrderBy({ order: 'asc', column: c.key });
    }
    if (orderBy?.order === 'asc') {
      setOrderBy({ order: 'desc', column: c.key });
    }
    if (orderBy?.order === 'desc') {
      setOrderBy(null);
    }
  };

  React.useEffect(() => {
    // Todo: Replace with properly check of cached values
    if (!Object.entries(pricedTokens).length) {
      dispatch(getTokensPrice({}));
    }
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl mt-4 font-black text-violet">Tokens list</h1>
      <Table
        isLoading={isPricedTokensLoading}
        columns={columns}
        rows={rows}
        layout="20px minmax(70px, 3fr) repeat(3, 1fr)"
        orderBy={orderBy}
        onColumnClick={handleColumnClick}
      />
    </Layout>
  );
};

export default Tokens;
