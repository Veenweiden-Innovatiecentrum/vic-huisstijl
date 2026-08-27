import type { ReactNode, CSSProperties, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

interface ButtonOwnProps {
  /** Visuele variant. Default: 'primary'. */
  variant?: 'primary' | 'secondary' | 'outline' | 'link';
  /** Grootte. Default: 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** Wanneer gezet rendert de knop als <a>. */
  href?: string;
  children?: ReactNode;
  /** Extra class(es), toegevoegd naast (niet in plaats van) de vic-btn-klassen. */
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * Native knop- én link-attributen (title, aria-*, type, target, rel, ...) zijn
 * toegestaan naast de props hierboven — de implementatie spreidt ze door naar
 * het onderliggende element (<button> zonder href, <a> met href).
 */
type ButtonNativeProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof ButtonOwnProps
>;

/**
 * VIC knop — groen primair, blauw secundair, outline of tekstlink met pijl.
 */
export interface ButtonProps extends ButtonOwnProps, ButtonNativeProps {}

export declare function Button(props: ButtonProps): JSX.Element;
