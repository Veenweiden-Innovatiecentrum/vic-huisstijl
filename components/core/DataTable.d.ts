import type { ReactNode, CSSProperties, Key } from 'react';

/**
 * Tabel met groene headerbalk en om-en-om witte/zachtgroene rijen,
 * naar het VIC PPT-sjabloon.
 */
export interface DataTableProps {
  /** Kolomkoppen. */
  columns: ReactNode[];
  /** Rijen als arrays van celinhoud — een cel mag een willekeurige node zijn. */
  rows: ReactNode[][];
  /**
   * Rij-callback. Als deze is gezet wordt de rij klikbaar én
   * toetsenbord-bedienbaar (Enter/spatie, role="button", tabIndex 0) met
   * zichtbare focus. Zonder onRowClick is een rij een gewone <tr>.
   */
  onRowClick?: (row: ReactNode[], index: number) => void;
  /** Sleutel per rij. Default: de rij-index (zoals nu). */
  rowKey?: (row: ReactNode[], index: number) => Key;
  /** Optionele class per rij (bijv. voor markeringen), naast vic-table__row--clickable. */
  rowClassName?: (row: ReactNode[], index: number) => string | undefined;
  /** Extra class(es), toegevoegd naast (niet in plaats van) de vic-table-klasse. */
  className?: string;
  style?: CSSProperties;
}

export declare function DataTable(props: DataTableProps): JSX.Element;
