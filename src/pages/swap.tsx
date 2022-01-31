import React from 'react';

import { uniqBy } from 'lodash';
import { NextPage } from 'next';

import Confirmation from '@components/Confirmation';
import Layout from '@components/Layout';
import TokenPicker from '@components/TokenPicker';
import {
  PickedTokens,
  TokenPickerStatus,
  TransactionSettings,
} from '@components/TokenPicker/TokenPicker.types';
import { useSelector } from '@src/hooks';
import { DEFAULT_TRANSACTIONS_SETTINGS } from '@src/services/sampleData';
import { CountableToken } from '@src/types';
import { Button, Modal } from '@src/ui';
import { selectWallet } from '@store/wallet';

import permutePickedTokens from '../utils/permutePickedTokens';

const SwapDetails: React.VFC<{ tokens: PickedTokens }> = ({ tokens }) => {
  return (
    <div className="bg-control flex flex-col gap-1 text-dark w-[15em] py-2 px-4 rounded-md">
      <span className="text-violet leading-none font-bold">Details</span>
      {tokens.some((t) => !t?.address) ? (
        <span className="text-sm text-violet-60">
          Select pair before getting rate
        </span>
      ) : (
        <>
          <span className="text-sm text-violet-60 leading-none">
            <b>1.51 {tokens[1]?.symbol}</b> per <b>{tokens[0]?.symbol}</b>
          </span>
          <span className="text-sm font-bold text-violet-60 leading-none">
            0.2% fees
          </span>
        </>
      )}
    </div>
  );
};

const Swap: NextPage = () => {
  const [tokens, setTokens] = React.useState<PickedTokens>([null, null]);
  const [settings, setSettings] = React.useState<TransactionSettings>(
    DEFAULT_TRANSACTIONS_SETTINGS
  );
  const [confirmationModal, setConfirmationModal] =
    React.useState<boolean>(false);

  const { balances, status, address } = useSelector(selectWallet);

  // Conversion rate are hardcoded for now
  const conversionRate = 1.51;

  // Process new tokens from TokenPicker
  const handleTokensChange = (t: PickedTokens) => {
    const newTokens = [...t];
    const sourceToken = newTokens[0];

    const isSourceTokenChanged =
      tokens[0]?.address !== sourceToken?.address ||
      tokens[0]?.amount !== sourceToken?.amount;

    if (isSourceTokenChanged) {
      const changedTokens = newTokens.splice(1).map((_t) =>
        _t !== null
          ? {
              ..._t,
              amount: sourceToken?.amount
                ? (sourceToken?.amount ?? 0) * conversionRate
                : null,
            }
          : null
      );
      return setTokens([sourceToken, ...changedTokens] as PickedTokens);
    }

    // In future it can be > 2, we have no warranty that is a changed item
    const otherItem = newTokens[1];
    newTokens.splice(0, 1, {
      ...sourceToken!,
      amount: otherItem?.amount
        ? (otherItem?.amount ?? 0) / conversionRate
        : null,
    });

    return setTokens(newTokens as PickedTokens);
  };

  const handlePermuteTokens = () => {
    setTokens(permutePickedTokens(tokens));
  };

  // TODO: Replace with separate function
  const formStatus = ((): TokenPickerStatus => {
    const sourceToken = tokens[0];
    if (status !== 'connected' || !address) {
      return {
        buttonText: 'Provide wallet',
        disabled: true,
        inputErrors: null,
      };
    }

    // If all tokens address are not provided
    if (tokens.some((t) => !t?.address)) {
      return { buttonText: 'Select tokens', disabled: true, inputErrors: {} };
    }

    // If some tokens are selected twice
    if (uniqBy(tokens, (t) => t!.address).length !== tokens.length) {
      return {
        buttonText: 'Duplicated tokens',
        disabled: true,
        inputErrors: {},
      };
    }

    // If all tokens address are not provided
    if (!tokens.every((t) => !!t?.amount && t.amount > 0)) {
      return {
        buttonText: 'Invalid amount',
        disabled: true,
        inputErrors: {},
      };
    }

    const sourceBalance = balances[sourceToken!.address];
    if (sourceToken!.amount! > (sourceBalance ?? 0)) {
      return {
        buttonText: 'Insufficient amount',
        disabled: true,
        inputErrors: { 0: true },
      };
    }

    return {
      buttonText: 'Swap',
      disabled: false,
      inputErrors: {},
    };
  })();

  return (
    <Layout>
      <div className="flex h-auto my-auto flex-col gap-4 items-center justify-center w-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-black text-violet">Exchange tokens</h1>
          <TokenPicker
            type="swap"
            onPermute={handlePermuteTokens}
            button={
              <Button
                className="mt-2"
                onClick={() => setConfirmationModal(true)}
                disabled={formStatus.disabled}
              >
                {formStatus.buttonText}
              </Button>
            }
            transactionSettings={settings}
            onTransactionSettingsChange={setSettings}
            disabled={formStatus.disabled}
            inputErrors={formStatus.inputErrors}
            details={<SwapDetails tokens={tokens} />}
            tokens={tokens}
            onChange={handleTokensChange}
          />
        </div>
      </div>

      <Modal
        isOpen={confirmationModal}
        onClose={() => setConfirmationModal(false)}
      >
        <Confirmation
          onCancel={() => setConfirmationModal(false)}
          inputs={[tokens[0]!]}
          outputs={tokens.slice(1) as CountableToken[]}
          type="swap"
          onConfirm={() => setConfirmationModal(false)}
          info={{
            Fees: `1.25$`,
            Slippage: `${settings.slippage}%`,
            Deadline: `${settings.deadline} min.`,
          }}
        />
      </Modal>
    </Layout>
  );
};

export default Swap;
