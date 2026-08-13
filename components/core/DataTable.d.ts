import type { ReactNode, CSSProperties } from 'react';

/**
 * Tabel met groene headerbalk en om-en-om witte/zachtgroene rijen,
 * naar het VIC PPT-sjabloon.
 */
export interface DataTableProps {
  /** Kolomkoppen. */
  columns: ReactNode[];
  /** Rijen als arrays van celinhoud. */
  rows: ReactNode[][];
  style?: CSSProperties;
}

export declare function DataTable(props: DataTableProps): JSX.Element;
