import { ReactNode } from 'react';

import { CountableToken } from '@src/types';

export interface ConfirmationProps {
  /**
   * Array of tokens that will be spent
   */
  inputs: CountableToken[];

  /**
   * Type of way of speding tokens
   */
  type: 'swap' | 'stake';

  /**
   * Array of tokens that will be recieved
   */
  outputs: CountableToken[];

  /**
   * Container with info to display
   */
  info: {
    [title: string]: ReactNode;
  };

  onConfirm?: () => void;

  onCancel?: () => void;
}

export type TokenRowProps = {
  token: CountableToken;
};
