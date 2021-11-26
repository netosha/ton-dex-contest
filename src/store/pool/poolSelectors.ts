import { RootState } from '@store/store';

/**
 * Selects pool store
 */
export const selectPool = ({ pool }: RootState) => pool;

// TODO: Replace with createSelector
/**
 * Selects pools state
 */
export const selectPools = ({ pool }: RootState) => ({
  pools: pool.pools,
  isPoolsLoading: pool.isPoolsLoading,
});

/**
 * Selects graph data for pool
 */
export const selectPoolGraphData =
  (id: string) =>
  ({ pool }: RootState) =>
    pool.poolGraphs[id];
