import React from 'react';

import { Property } from 'csstype';

export interface Column {
  label: string;
  key: string;
  style?: React.HTMLAttributes<HTMLDivElement>;
}

export type Columns = Column[];

/**
 * Avoid using rowProps as column key.
 *
 * Keep in mind, that rowProps reserved for bypassing props to row component
 */
export type Keys = Columns[number]['key'];

export type OrderBy = {
  order: 'asc' | 'desc';
  column: Keys;
};

/**
 * Avoid using rowProps as column key.
 *
 * Keep in mind, that rowProps reserved for bypassing props to row component
 */
export interface Row {
  id: string | number;
  [key: Keys]: React.ReactNode;
  rowProps?: React.HTMLAttributes<HTMLDivElement>;
}

export interface TableProps {
  rows: Row[];
  columns: Column[];

  /**
   * Show loader when table items is loading
   */
  isLoading?: boolean;

  /**
   * Custom column layout
   *
   * Default: repeat(1fr, rows.length)
   */
  layout?: Property.GridTemplateColumns<string | number>;

  onColumnClick?: (column: Column) => void;

  /**
   * Show order column in header
   */
  orderBy?: OrderBy | null;
}
