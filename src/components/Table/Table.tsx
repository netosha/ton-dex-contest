import React from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

import { TableProps } from './Table.types';

const Table: React.VFC<TableProps> = (props) => {
  const {
    rows,
    isLoading,
    columns,
    layout = `repeat(auto, ${rows.length})`,
    orderBy,
    onColumnClick,
  } = props;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="h-6 animate-shine bg-control w-full rounded-lg" />
        {Array.from({ length: 3 }).map((_r, i) => (
          <div
            key={i}
            className="h-12 animate-shine bg-control w-full rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div
        className="grid grid-flow-col gap-2 px-4 py-2 w-full font-extrabold text-violet-80 text-test"
        style={{ gridTemplateColumns: layout }}
      >
        {columns.map((c) => (
          <div
            className="flex gap-1 items-center cursor-pointer select-none"
            onClick={() => onColumnClick?.(c)}
            key={c.key}
          >
            {c.label}
            {orderBy?.column === c.key && (
              <>
                {orderBy.order === 'asc' && (
                  <ChevronUpIcon className="w-3 h-3" />
                )}
                {orderBy.order === 'desc' && (
                  <ChevronDownIcon className="w-3 h-3" />
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex font-bold text-sm text-dark flex-col gap-[0.625rem]">
        {rows.map((r) => (
          <div
            key={r.id}
            className="grid grid-flow-col gap-2 p-4 w-full rounded-lg cursor-pointer bg-control"
            style={{ gridTemplateColumns: layout }}
            {...r?.rowProps}
          >
            {columns.map((c) => (
              <div key={`${r.id}-${c.key}`}>{r[c.key]}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
