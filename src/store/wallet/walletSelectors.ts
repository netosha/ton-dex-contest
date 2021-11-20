import { RootState } from '../store';

export const selectWallet = ({ wallet }: RootState) => wallet;

// export const selectWalletStatus = createSelector(
//   selectWallet,
//   ({ status }) => status
// );

// TODO: Fix it after redux-toolkit bump reselect version to >= 4.1.3 (just update @reduxjs/toolkit)
// https://github.com/reduxjs/redux-toolkit/blob/master/packages/toolkit/package.json
// https://github.com/reduxjs/reselect/pull/545
// export const selectTokenBalances = createSelector(
//   selectWallet,
//   ({ balances }) => balances
// );

export const selectTokenBalances = ({ wallet }: RootState) => wallet.balances;
