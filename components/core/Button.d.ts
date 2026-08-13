/**
 * VIC knop — groen primair, blauw secundair, outline of tekstlink met pijl.
 */
export interface ButtonProps {
  /** Visuele variant. Default: 'primary'. */
  variant?: 'primary' | 'secondary' | 'outline' | 'link';
  /** Grootte. Default: 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** Wanneer gezet rendert de knop als <a>. */
  href?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
}
