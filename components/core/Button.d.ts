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
 * Native knop- én link-attributen (title, aria-*, target, rel, ...) zijn
 * toegestaan naast de props hierboven — de implementatie spreidt ze door naar
 * het onderliggende element (<button> zonder href, <a> met href).
 *
 * `type` ligt apart: op <button> is dat 'button' | 'submit' | 'reset', op <a>
 * een willekeurige MIME-string (bijv. bij een download-link). Een simpele
 * intersectie van beide attribuut-sets zou `type` versmallen tot alleen de
 * knop-variant en `<Button href="/rapport.pdf" type="application/pdf">` ten
 * onrechte afkeuren — dus `type` krijgt de union van beide element-types.
 */
type ButtonNativeProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof ButtonOwnProps | 'type'
> & {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'] | AnchorHTMLAttributes<HTMLAnchorElement>['type'];
};

/**
 * VIC knop — groen primair, blauw secundair, outline of tekstlink met pijl.
 */
export interface ButtonProps extends ButtonOwnProps, ButtonNativeProps {}

export declare function Button(props: ButtonProps): JSX.Element;
