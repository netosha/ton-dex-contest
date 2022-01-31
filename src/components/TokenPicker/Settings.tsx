import React from 'react';

import { QuestionMarkCircleIcon } from '@heroicons/react/solid';

import {
  SettingsProps,
  TransactionSettings,
} from '@components/TokenPicker/TokenPicker.types';
import { DEFAULT_TRANSACTIONS_SETTINGS } from '@src/services/sampleData';
import { Button, Input, Tooltip } from '@src/ui';

const SlippageTooltip: React.VFC = () => {
  return (
    <span className="bg-control text-sm font-semibold flex flex-col w-[15em] py-2 px-4 rounded-md shadow-lg text-violet-80">
      It defines percent from current price, that allows tranasction to be
      executed
    </span>
  );
};

const DeadlineTooltip: React.VFC = () => {
  return (
    <span className="bg-control text-sm font-semibold flex flex-col w-[15em] py-2 px-4 rounded-md shadow-lg text-violet-80">
      Time, that transaction will be active after creating
    </span>
  );
};

const Settings: React.VFC<SettingsProps> = ({
  settings = DEFAULT_TRANSACTIONS_SETTINGS,
  onSubmit,
}) => {
  const [state, setState] = React.useState<TransactionSettings>(settings);
  const { deadline, slippage } = state;

  // Todo: Replace with yup
  const isValid = (() => {
    if (deadline > 3600 || deadline < 0) return false;
    if (slippage > 100 || deadline < 0) return false;
    return true;
  })();

  return (
    <form className="flex flex-1 flex-col gap-4">
      <label className="flex flex-col gap-1 text-violet-60 font-semibold">
        <div className="flex items-center">
          Slippage
          <Tooltip position={'right'} content={<SlippageTooltip />}>
            <QuestionMarkCircleIcon className="ml-1 text-gray hover:text-blue transition-colors w-4 h-4" />
          </Tooltip>
          <span className="text-violet-20 text-sm ml-auto">(%)</span>
        </div>
        <Input
          defaultValue={slippage}
          type="number"
          min={0}
          max={100}
          onChange={(e) =>
            setState({ ...settings, slippage: Number(e.target.value) })
          }
          className="font-bold col-span-3 text-violet"
          placeholder="2"
        />
      </label>

      <label className="flex flex-col gap-1 text-violet-60 font-semibold">
        <div className="flex items-center w-full">
          Deadline
          <Tooltip position={'right'} content={<DeadlineTooltip />}>
            <QuestionMarkCircleIcon className="ml-1 text-gray hover:text-blue transition-colors w-4 h-4" />
          </Tooltip>
          <span className="text-violet-20 text-sm ml-auto">max 3600</span>
        </div>
        <Input
          defaultValue={deadline}
          type="number"
          onChange={(e) =>
            setState({ ...settings, deadline: Number(e.target.value) })
          }
          className="font-bold col-span-3 text-violet"
          placeholder="5"
        />
      </label>

      <Button
        disabled={!isValid}
        onClick={(e) => {
          e.preventDefault();
          onSubmit?.(state);
        }}
        type="submit"
        className="mt-auto"
      >
        Save
      </Button>
    </form>
  );
};

export default Settings;
