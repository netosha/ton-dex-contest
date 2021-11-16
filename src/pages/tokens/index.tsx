import React from 'react';

import { NextPage } from 'next';

import Layout from '@components/Layout';
import PriceChange from '@components/PriceChange';
import Table, { Column, OrderBy } from '@components/Table';
import useDispatch from '@hooks/useDispatch';
import useSelector from '@hooks/useSelector';
import { getTokensList, selectToken } from '@store/token';

const columns = [
  { key: 'position', label: '' },
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price' },
  { key: 'priceChange', label: 'Price Change' },

  { key: 'volume', label: 'Volume' },
];

const Tokens: NextPage = () => {
  const { tokens, isLoading } = useSelector(selectToken);
  const dispatch = useDispatch();

  const [orderBy, setOrderBy] = React.useState<null | OrderBy>(null);

  // TODO: Make it as separate function
  const rows = isLoading
    ? []
    : Object.values(tokens).map((t, i) => ({
        id: t.address,
        position: i + 1,
        name: (
          <span>
            {t.name} <span className="ml-1 text-violet-50">{t.ticker}</span>
          </span>
        ),
        price: <span>${t.price}</span>,
        priceChange: (
          <PriceChange type={t.priceChange.type} value={t.priceChange.amount} />
        ),
        volume: `${t.tradingVolume}m`,
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
    dispatch(getTokensList({}));
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl mt-4 font-black text-violet">Tokens list</h1>
      <Table
        isLoading={isLoading}
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
