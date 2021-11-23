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
