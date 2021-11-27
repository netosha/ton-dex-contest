import { createSelector } from 'reselect';

import { RootState } from '@store/store';

/**
 * Selects pool store
 */
export const selectPool = ({ pool }: RootState) => pool;

/**
 * Selects pools state
 */
export const selectPools = createSelector(
  selectPool,
  ({ pools, isPoolsLoading }) => ({
    pools,
    isPoolsLoading,
  })
);

/**
 * Selects pools state
 */
export const selectWalletPools = createSelector(
  selectPool,
  ({ walletPools, isWalletPoolsLoading }) => ({
    walletPools,
    isWalletPoolsLoading,
  })
);

const selectItemId = (_st: any, itemId: any) => itemId;

/**
 * Select Detailed Pool data
 */
export const selectDetailedPool = createSelector(
  [selectPool, selectItemId],
  ({ detailedPools }, id: string) => {
    return detailedPools[id];
  }
);

/**
 * Selects pool's graph data
 */
export const selectPoolGraphData = createSelector(
  [selectPool, selectItemId],
  ({ graphData }, id: string) => {
    return graphData[id];
  }
);
