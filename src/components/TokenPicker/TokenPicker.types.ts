import { ReactNode } from 'react';

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

  /**
   * Type of showed icon and submit button
   */
  type: 'swap' | 'stake';

  /**
   * Show icon with details tooltip in misc button
   * Disabled when at least one token are not provided
   *
   * For example: conversion rate, fees, etc.
   */
  details?: ReactNode;

  /**
   * Show clickcable icon, that shows transactions modal
   */
  isTransactionsVisible?: boolean;

  onChange?: (tokens: PickedTokens) => void;
}

export interface TokenRowProps {
  token: Token;
  onClick: () => void;
  isActive: boolean;
}
