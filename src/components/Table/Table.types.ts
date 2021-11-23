import React from 'react';

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
} | null;

/**
 * Avoid using rowProps as column key.
 *
 * Keep in mind, that is reserved for bypassing props to row component
 */
export interface Row {
  id: string | number;
  [key: Keys]: React.ReactNode;
  rowProps?: React.HTMLProps<HTMLAnchorElement>;
}

export interface TableProps {
  rows: Row[];
  columns: Column[];

  isLoading?: boolean;

  /**
   * Column layout from grid-template-columns
   *
   * Default: repeat(1fr, rows.length)
   *
   * @see{Property.GridTemplateColumns<string | number>}
   */
  layout?: string;

  onOrderByChange?: (ord: OrderBy) => void;

  /**
   * Pass props directly every row
   *
   * It's useful, when you want to style all table
   */
  rowsProps?: React.HTMLProps<HTMLAnchorElement>;

  /**
   * Show order column in header
   */
  orderBy?: OrderBy;
}
