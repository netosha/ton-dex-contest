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
   * Submit button
   */
  button: ReactNode;

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
   *
   * @param {PickedTokens} tokens
   */

  onChange?: (tokens: PickedTokens) => void;

  /**
   * Disable submit button
   */
  disabled?: boolean;

  /**
   * Highlight wrong input line
   */
  inputErrors?: InputErrors;
}

export interface TokenRowProps {
  token: Token;
  onClick: () => void;
  isActive: boolean;
}

export type InputErrors =
  | {
      [index: number]: string | boolean;
    }
  | undefined
  | null;

export interface TokenPickerStatus {
  /**
   * Submit button
   */
  buttonText: string;

  /**
   * Input errors
   *
   * For example: {0: false, 1: "wrong balance", ...}
   */
  inputErrors: InputErrors;
  disabled: boolean;
}
