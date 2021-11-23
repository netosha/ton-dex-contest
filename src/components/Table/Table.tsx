import React from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import cn from 'clsx';
import { omit } from 'lodash';

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
    rowsProps,
  } = props;

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
        className="grid grid-flow-col gap-2 px-4 py-2 w-full text-sm font-bold text-violet-60 text-test"
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
          <a
            key={r.id}
            className={cn(
              'grid grid-flow-col gap-2 p-4 w-full rounded-lg cursor-pointer bg-control',
              r?.rowProps?.className,
              rowsProps?.className
            )}
            style={{
              gridTemplateColumns: layout,
              ...rowsProps?.style,
              ...r?.rowProps,
            }}
            {...omit(r?.rowProps, 'className', 'style')}
            {...omit(rowsProps, 'className', 'style')}
          >
            {columns.map((c) => (
              <div key={`${r.id}-${c.key}`}>{r[c.key]}</div>
            ))}
          </a>
        ))}

        {/* Loading rows */}
        {isLoading &&
          Array.from({ length: 3 }).map((_r, i) => (
            <a
              key={i}
              className={cn(
                'w-full h-12 rounded-lg animate-shine bg-control',
                rowsProps?.className
              )}
              style={rowsProps?.style}
              {...omit(rowsProps, 'className', 'style')}
            />
          ))}
      </div>
    </div>
  );
};

export default Table;
