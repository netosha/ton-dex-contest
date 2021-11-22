import React from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

import { Column, TableProps } from './Table.types';

// TODO: Make row as independent component
const Table: React.VFC<TableProps> = (props) => {
  const {
    rows,
    isLoading,
    columns,
    layout = `repeat(auto, ${rows.length})`,
    orderBy,
    onOrderByChange,
  } = props;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full h-9 rounded-lg animate-shine bg-control" />
        {Array.from({ length: 3 }).map((_r, i) => (
          <div
            key={i}
            className="w-full h-12 rounded-lg animate-shine bg-control"
          />
        ))}
      </div>
    );
  }

  const onColumnClick = (c: Column) => {
    if (orderBy === null) {
      onOrderByChange?.({ order: 'asc', column: c.key });
    }
    if (orderBy?.order === 'asc') {
      onOrderByChange?.({ order: 'desc', column: c.key });
    }
    if (orderBy?.order === 'desc') {
      onOrderByChange?.(null);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div
        className="grid grid-flow-col gap-2 px-4 py-2 w-full font-extrabold text-violet-80 text-test"
        style={{ gridTemplateColumns: layout }}
      >
        {columns.map((c) => (
          <div
            className="gap-1 items-center cursor-pointer select-none flex	"
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
