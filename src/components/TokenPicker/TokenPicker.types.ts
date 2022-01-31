import { ReactNode, MouseEvent } from 'react';

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
   * Action transaction's settings
   */
  transactionSettings?: TransactionSettings;

  /**
   * Change event with new settings
   * @param {TransactionSettings} settings
   */
  onTransactionSettingsChange?: (settings: TransactionSettings) => void;

  /**
   * Change event with new tokens
   *
   * @param {PickedTokens} tokens
   */
  onChange?: (tokens: PickedTokens) => void;

  /**
   * Execute when user clicks on permute button
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e
   */
  onPermute?: (e: MouseEvent<HTMLButtonElement>) => void;

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

export interface SettingsProps {
  settings: TransactionSettings;
  onSubmit?: (s: TransactionSettings) => void;
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

export interface TransactionSettings {
  /**
   * Slippage in percents
   */
  slippage: number;

  /**
   * After the transaction is created, it will still be active provided time
   */
  deadline: number;
}
