import { Token } from '@src/types';

export interface PickedToken extends Token {
  /**
   * Amount of tokens to trade
   */
  amount: number;
}

/**
 * Note: Now it array of 2 tokens, but in future it would expanded.
 *
 * Not a production-ready solution
 */
export type PickedTokens = [PickedToken | null, PickedToken | null];

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
