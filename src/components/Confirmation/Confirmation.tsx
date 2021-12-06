import React from 'react';

import { ArrowDownIcon, PlusIcon } from '@heroicons/react/solid';

import { ConfirmationProps } from '@components/Confirmation/Confirmation.types';
import { Button } from '@src/ui';

const Confirmation: React.VFC<ConfirmationProps> = (props) => {
  const {
    inputs,
    outputs,
    onConfirm,
    onCancel,
    info = {},
    type = 'swap',
  } = props;
  return (
    <div className="flex flex-1 h-full flex-col w-full">
      <h2 className="text-center text-2xl font-black text-violet">
        Transaction confirm
      </h2>

      <div className="flex flex-col gap-2 mt-4">
        {inputs.map((input) => (
          <div
            key={input.address}
            className="py-2 px-4 text-dark font-bold rounded-md bg-control"
          >
            {input.symbol} - {input.amount}
          </div>
        ))}
      </div>

      <div className="w-full my-4">
        {type === 'swap' && <ArrowDownIcon className="w-4 h-4 mx-auto" />}
        {type === 'stake' && <PlusIcon className="w-4 h-4 mx-auto" />}
      </div>

      <div className="flex flex-col gap-2">
        {outputs.map((input) => (
          <div
            key={input.address}
            className="py-2 px-4 text-dark font-bold rounded-md bg-control"
          >
            {input.symbol} - {input.amount}
          </div>
        ))}
      </div>

      <div className="w-full mt-4 flex flex-col gap-3">
        {Object.entries(info).map(([title, content]) => (
          <div className="flex items-center" key={title}>
            <span className="leading-none font-extrabold">{title}:</span>
            <span className="text-violet-60 ml-2 leading-none">{content}</span>
          </div>
        ))}
      </div>

      <div className="flex w-full justify-center mt-auto gap-4 pt-6">
        <Button onClick={onConfirm}>Confirm</Button>
        <Button onClick={onCancel} secondary>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Confirmation;
