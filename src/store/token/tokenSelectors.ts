import { RootState } from '@store/store';

/**
 * Selects token store
 */
export const selectToken = ({ token }: RootState) => token;

/**
 * Selects list of loaded tokens
 */
export const selectTokens = ({ token }: RootState) => token.tokens;
