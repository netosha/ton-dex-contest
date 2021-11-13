import { RootState } from '../store';

export const selectWallet = ({ wallet }: RootState) => wallet;

// https://github.com/reduxjs/reselect/pull/545
// @ts-ignore
// export const selectWalletStatus = createSelector(
//   selectWallet,
//   ({ status }) => status
// );
