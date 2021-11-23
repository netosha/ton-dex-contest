import React from 'react';

import { sortBy } from 'lodash';
import { NextPage } from 'next';

import Layout from '@components/Layout';
import PriceChange from '@components/PriceChange';
import Table, { OrderBy, Row } from '@components/Table';
import useDispatch from '@hooks/useDispatch';
import useSelector from '@hooks/useSelector';
import { getTokensPrice, selectToken } from '@store/token';

const columns = [
  { key: 'position', label: '' },
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price' },
  { key: 'priceChange', label: 'Price Change' },

  { key: 'tradingVolume', label: 'Volume' },
];

// Todo: replace it when API comes in
const positions: { [key: string]: number } = {
  EQA6ogjFLp8cxwDJCwBwYeQsavqSRidthmPjMgRqBAqtmNoN: 2,
  EQAdM77uArYBDwuscIE1oMs4HzWxjtBcg6z9waiL_7rkKfAc: 0,
  'EQCA7OM1eWfrvDDD-O9VxxvpC4m3l-IUW4k7KEFxgBjtNih6': 4,
  'EQCToqoCFszgWj420UX1evMX-ZulNzGqeDpLv-6ZB7yRTjCL': 1,
  'kf-kkdY_B7p-77TLn2hUhM6QidWrrsl8FYWCIvBMpZKprBtN': 3,
};

const Tokens: NextPage = () => {
  const { pricedTokens, isPricedTokensLoading } = useSelector(selectToken);
  const dispatch = useDispatch();

  const [orderBy, setOrderBy] = React.useState<null | OrderBy>(null);

  // Probably need useMemo in future
  const orderedRows = orderBy
    ? sortBy(
        Object.values(pricedTokens),
        orderBy.column === 'priceChange' ? 'priceChange.amount' : orderBy.column
      )
    : Object.values(pricedTokens);

  if (orderBy?.order === 'desc') {
    orderedRows.reverse();
  }

  // TODO: Make it as separate function
  const rows: Row[] = orderedRows.map((t) => ({
    id: t.address,
    position: (
      <span className="text-violet-40">{positions[t.address]! + 1}</span>
    ),

    name: (
      <span className="flex gap-1">
        {t.name} <span className="text-violet-50">{t.symbol}</span>
      </span>
    ),
    price: <span>${t.price.toFixed(2)}</span>,
    priceChange: (
      <PriceChange type={t.priceChange.type} value={t.priceChange.amount} />
    ),
    tradingVolume: `${t.tradingVolume.toFixed(2)}m`,
  }));

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
        onOrderByChange={(o) => setOrderBy(o)}
      />
    </Layout>
  );
};

export default Tokens;
