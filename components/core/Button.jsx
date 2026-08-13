import React from 'react';

/**
 * VIC knop. Varianten: primary (groen), secondary (donkerblauw),
 * outline (groene rand) en link (groene tekstlink met pijl).
 * Rendert <a> wanneer href is gezet, anders <button>.
 */
export function Button({ variant = 'primary', size = 'md', href, children, style, ...rest }) {
  const pad = size === 'sm' ? '8px 16px' : size === 'lg' ? '14px 28px' : '11px 22px';
  const fontSize = size === 'sm' ? 14 : size === 'lg' ? 17 : 15;

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'var(--font-sans)',
    fontSize,
    fontWeight: 700,
    lineHeight: 1.2,
    padding: pad,
    borderRadius: 'var(--radius-sm)',
    border: '2px solid transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 160ms ease-out, color 160ms ease-out, border-color 160ms ease-out',
  };

  const variants = {
    primary: {
      background: 'var(--button-primary)',
      color: 'var(--text-inverse)',
    },
    secondary: {
      background: 'var(--button-secondary)',
      color: 'var(--text-inverse)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--vic-green)',
      borderColor: 'var(--vic-green)',
    },
    link: {
      background: 'transparent',
      color: 'var(--link)',
      padding: 0,
      border: 'none',
      borderRadius: 0,
    },
  };

  const hover = {
    primary: { background: 'var(--button-primary-hover)' },
    secondary: { background: 'var(--button-secondary-hover)' },
    outline: { background: 'var(--vic-green)', color: 'var(--text-inverse)' },
    link: { color: 'var(--link-hover)' },
  };

  const [isHover, setHover] = React.useState(false);
  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...(isHover ? hover[variant] : null), ...style }}
      {...rest}
    >
      {children}
      {variant === 'link' && <span aria-hidden="true" style={{ fontWeight: 400 }}>→</span>}
    </Tag>
  );
}
