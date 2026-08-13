import React from 'react';

/**
 * VIC knop. Varianten: primary (groen), secondary (donkerblauw),
 * outline (groene rand) en link (groene tekstlink met pijl).
 * Rendert <a> wanneer href is gezet, anders <button>.
 * Styling komt uit components.css (tokens); hover/focus zijn CSS, geen React-state.
 */
export function Button({ variant = 'primary', size = 'md', href, children, className, style, ...rest }) {
  const Tag = href ? 'a' : 'button';
  const classes = ['vic-btn', `vic-btn--${variant}`, `vic-btn--${size}`, className].filter(Boolean).join(' ');

  return React.createElement(
    Tag,
    { href, className: classes, style, ...rest },
    children,
    variant === 'link'
      ? React.createElement('span', { key: 'arrow', 'aria-hidden': 'true', className: 'vic-btn__arrow' }, '→')
      : null
  );
}
