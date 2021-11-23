import { CountableToken, Token } from '@src/types';

/**
 * Note: Now it array of 2 tokens, but in future it would expanded.
 *
 * Not a production-ready solution
 */
export type PickedTokens = [CountableToken | null, CountableToken | null];

export interface TokenPickerProps {
  /**
   * Array of picked tokens
   */
  tokens: PickedTokens;

  onChange?: (tokens: PickedTokens) => void;
}

export interface TokenRowProps {
  token: Token;
  onClick: () => void;
  isActive: boolean;
}
