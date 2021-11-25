import React from 'react';

import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { uniqBy } from 'lodash';
import { NextPage } from 'next';

import Layout from '@components/Layout';
import TokenPicker from '@components/TokenPicker';
import {
  PickedTokens,
  TokenPickerStatus,
} from '@components/TokenPicker/TokenPicker.types';
import { useSelector } from '@src/hooks';
import { Button, Tooltip } from '@src/ui';
import { selectWallet } from '@store/wallet';

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
  // const { query } = useRouter();
  const [tokens, setTokens] = React.useState<PickedTokens>([null, null]);
  const { balances, status, address } = useSelector(selectWallet);

  // console.log(query, tokens);

  // Conversion rate are hardcoded for now
  const conversionRate = 1.51;

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
    if (!tokens.every((t) => !!t?.amount)) {
      return {
        buttonText: 'Provide all amounts',
        disabled: true,
        inputErrors: {},
      };
    }

    // Check if some amount lower than balance
    if (
      tokens.some(
        (t) => balances[t!.address] && balances[t!.address]! < t!.amount!
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
      buttonText: 'Swap',
      disabled: false,
      inputErrors: {},
    };
  })();

  return (
    <Layout>
      <div className="flex h-auto my-auto flex-col gap-4 items-center justify-center w-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-black text-violet">Add liquidity</h1>
          <TokenPicker
            button={
              <Button className="mt-2" disabled={formStatus.disabled}>
                {formStatus.buttonText}
              </Button>
            }
            inputErrors={formStatus.inputErrors}
            onChange={setTokens}
            tokens={tokens}
            type={'stake'}
          />
          {/* If every token are provided */}
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
    </Layout>
  );
};

// Little trick to pass query params in router without re-rendering
// Check query logic before remove and remove, if needed
// https://nextjs.org/docs/api-reference/next/router#router-object
export async function getServerSideProps() {
  return { props: {} };
}

export default Create;
