import { RootState } from '@store/store';

/**
 * Selects token store
 */
export const selectToken = ({ token }: RootState) => token;

// TODO: Fix it after redux-toolkit bump reselect version to >= 4.1.3 (just update @reduxjs/toolkit)
// https://github.com/reduxjs/redux-toolkit/blob/master/packages/toolkit/package.json
// https://github.com/reduxjs/reselect/pull/545

/**
 * Selects loaded tokens (including user's provided)
 */
// export const selectTokens = createSelector(selectToken, ({ tokens }) => tokens);
export const selectTokens = ({ token }: RootState) => token.tokens;
