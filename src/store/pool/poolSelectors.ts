import { RootState } from '@store/store';

/**
 * Selects pool store
 */
export const selectPool = ({ pool }: RootState) => pool;

/**
 * Selects pools state
 */
export const selectPools = ({ pool }: RootState) => pool.pools;
