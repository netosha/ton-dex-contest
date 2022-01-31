import React from 'react';

import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
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
import { Button, Modal, Tooltip } from '@src/ui';
import { selectWallet } from '@store/wallet';

import permutePickedTokens from '../../utils/permutePickedTokens';

const FeeTooltip: React.VFC = () => {
  return (
    <div className="bg-control text-sm font-semibold flex flex-col w-[15em] py-2 px-4 rounded-md">
      A commission that will be charged for each transaction. It provides the
      pool income.
    </div>
  );
};

const ShareTooltip: React.VFC<{ share: string }> = ({ share }) => {
  return (
    <div className="bg-control text-sm font-semibold flex flex-col w-[15em] py-2 px-4 rounded-md">
      You get {share} from all pool income
    </div>
  );
};

const Create: NextPage = () => {
  const [tokens, setTokens] = React.useState<PickedTokens>([null, null]);
  const [settings, setSettings] = React.useState<TransactionSettings>(
    DEFAULT_TRANSACTIONS_SETTINGS
  );

  const [confirmationModal, setConfirmationModal] =
    React.useState<boolean>(false);

  const { balances, status, address } = useSelector(selectWallet);

  const handlePermuteTokens = () => {
    setTokens(permutePickedTokens(tokens));
  };

  // Conversion rate are hardcoded for now
  const conversionRate = 1.51;

  // Todo: Make it as separate function
  const formStatus = ((): TokenPickerStatus => {
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

    // If some amount are invalid
    if (!tokens.every((t) => typeof t?.amount === 'number')) {
      return {
        buttonText: 'Provide all amounts',
        disabled: true,
        inputErrors: {},
      };
    }

    // Check if some amount lower than balance
    if (
      tokens.some(
        (t) => balances[t!.address] === 0 || balances[t!.address]! < t!.amount!
      )
    ) {
      const inputErrors = tokens.reduce(
        (prev, t, i) =>
          balances[t!.address]! < t!.amount! ? { ...prev, [i]: true } : prev,
        {}
      );
      return {
        buttonText: 'Insufficient amount',
        disabled: true,
        inputErrors,
      };
    }

    return {
      buttonText: 'Supply',
      disabled: false,
      inputErrors: {},
    };
  })();

  return (
    <Layout>
      <div className="flex h-auto my-auto flex-col gap-4 items-center justify-center w-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-black text-violet">
            Create liquidity pool
          </h1>
          <TokenPicker
            button={
              <Button
                onClick={() => setConfirmationModal(true)}
                className="mt-2"
                disabled={formStatus.disabled}
              >
                {formStatus.buttonText}
              </Button>
            }
            inputErrors={formStatus.inputErrors}
            onChange={setTokens}
            tokens={tokens}
            type={'stake'}
            transactionSettings={settings}
            onTransactionSettingsChange={(s) => setSettings(s)}
            onPermute={handlePermuteTokens}
          />
          {/* If every token are provided show more info */}
          {tokens.every((t) => t?.address) && (
            <>
              <div className="my-2">
                <div className="w-full h-[1px] bg-control" />
              </div>
              <div className="grid grid-cols-3 gap-4 rounded-md w-full ">
                <div className="flex flex-col">
                  <div className="flex items-center text-violet font-extrabold">
                    Fee
                    <Tooltip position={'bottom'} content={<FeeTooltip />}>
                      <QuestionMarkCircleIcon className="ml-1 text-gray hover:text-blue transition-colors w-4 h-4" />
                    </Tooltip>
                  </div>
                  <span className="text-sm font-bold text-violet-60">
                    {'0.2%'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center text-violet font-extrabold">
                    Share
                    <Tooltip
                      position={'bottom'}
                      content={<ShareTooltip share="~0.02%" />}
                    >
                      <QuestionMarkCircleIcon className="ml-1 text-gray hover:text-blue transition-colors w-4 h-4" />
                    </Tooltip>
                  </div>
                  <span className="text-sm font-bold text-violet-60">
                    {'~ 0.02%'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center text-violet font-extrabold">
                    {conversionRate.toFixed(3)} {tokens[1]?.symbol}
                  </div>
                  <span className="text-sm font-bold text-violet-60">
                    per {tokens[0]?.symbol}
                  </span>
                </div>
              </div>
            </>
          )}
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
          type="stake"
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

export default Create;
