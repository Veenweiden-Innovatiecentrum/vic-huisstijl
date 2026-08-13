/**
 * Tabel met groene headerbalk en om-en-om witte/zachtgroene rijen,
 * naar het VIC PPT-sjabloon.
 */
export interface DataTableProps {
  /** Kolomkoppen. */
  columns: React.ReactNode[];
  /** Rijen als arrays van celinhoud. */
  rows: React.ReactNode[][];
  style?: React.CSSProperties;
}
