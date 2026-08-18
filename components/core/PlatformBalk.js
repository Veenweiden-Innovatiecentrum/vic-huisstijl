import React from 'react';

// Hooks via de React-namespace (niet als named import): sommige omgevingen
// zonder bundler geven React alleen als default export door (zie voorbeeld/).
const { useEffect, useRef, useState } = React;

/** VIC-beeldmerk, klein en zelfvoorzienend (geen los asset-bestand nodig per app). */
const VIC_BEELDMERK = 'data:image/png;base64,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';

/** Initialen voor het accountrondje: eerste letters van (max) twee woorden;
 * ontbreekt de naam, dan het deel voor de @ van het e-mailadres. */
function initialen(naam, email) {
  const bron = naam || email || '';
  const schoon = (String(bron).split('@')[0] ?? '').trim();
  const woorden = schoon.split(/\s+/).filter(Boolean);
  const letters = woorden.slice(0, 2).map((w) => w[0]).join('');
  return (letters || schoon[0] || '?').toUpperCase();
}

/**
 * Gedeelde platformbalk voor hub, gids en VIA | Collect (vic-platform#61):
 * VIC-beeldmerk + optionele appnaam links (appnaam valt als eerste weg op een
 * smal scherm; logo en accountrondje blijven altijd staan), een children-slot
 * in het midden voor app-eigen knoppen, en uiterst rechts een rondje met
 * initialen dat uitklapt naar naam/e-mailadres, optionele menu-extra's en
 * uitloggen. Logo-klik gaat altijd naar de hub.
 * Plain React (geen framework-specifieke imports) — werkt zowel in Next.js
 * (hub, gids) als in Vite (VIA | Collect). Styling komt uit components.css
 * (tokens); hover/focus zijn CSS, geen React-state.
 */
export function PlatformBalk({
  appNaam,
  naam,
  email,
  uitlogUrl,
  onUitloggen,
  menuExtras = [],
  hubUrl = 'https://veenweiden.online',
  children,
  className,
  style,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const accountRef = useRef(null);
  const avatarKnopRef = useRef(null);

  // Sluit het accountmenu bij een klik buiten het menu of op Escape. Bij
  // Escape gaat de focus terug naar de avatar-knop, zodat toetsenbord- en
  // schermlezergebruikers niet "verdwaald" raken nadat het menu sluit.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const opKlik = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) setMenuOpen(false);
    };
    const opToets = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        avatarKnopRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', opKlik);
    document.addEventListener('keydown', opToets);
    return () => {
      document.removeEventListener('mousedown', opKlik);
      document.removeEventListener('keydown', opToets);
    };
  }, [menuOpen]);

  const sluitEnDoe = (fn) => () => {
    setMenuOpen(false);
    if (fn) fn();
  };

  const classes = ['vic-platformbalk', className].filter(Boolean).join(' ');
  const wieToont = naam || email;

  return React.createElement(
    'header',
    { className: classes, style },
    React.createElement(
      'a',
      { className: 'vic-platformbalk__merk', href: hubUrl },
      React.createElement('img', {
        className: 'vic-platformbalk__logo',
        src: VIC_BEELDMERK,
        alt: 'Veenweiden Innovatiecentrum',
      }),
      appNaam ? React.createElement('span', { className: 'vic-platformbalk__appnaam' }, appNaam) : null
    ),
    React.createElement('div', { className: 'vic-platformbalk__midden' }, children),
    React.createElement(
      'div',
      { className: 'vic-platformbalk__account', ref: accountRef },
      React.createElement(
        'button',
        {
          ref: avatarKnopRef,
          type: 'button',
          className: 'vic-platformbalk__avatar',
          'aria-haspopup': 'menu',
          'aria-expanded': menuOpen,
          'aria-label': `Accountmenu — ${wieToont}`,
          title: wieToont,
          onClick: () => setMenuOpen((v) => !v),
        },
        initialen(naam, email)
      ),
      menuOpen
        ? React.createElement(
            'div',
            { className: 'vic-platformbalk__menu', role: 'menu' },
            React.createElement(
              'div',
              { className: 'vic-platformbalk__wie' },
              React.createElement('strong', null, naam || email),
              naam ? React.createElement('span', null, email) : null
            ),
            ...menuExtras.map((item, i) =>
              React.createElement(
                item.href ? 'a' : 'button',
                {
                  key: i,
                  type: item.href ? undefined : 'button',
                  href: item.href,
                  role: 'menuitem',
                  className: 'vic-platformbalk__menu-item',
                  onClick: sluitEnDoe(item.onClick),
                },
                item.label
              )
            ),
            React.createElement(
              onUitloggen ? 'button' : 'a',
              {
                type: onUitloggen ? 'button' : undefined,
                href: onUitloggen ? undefined : uitlogUrl,
                role: 'menuitem',
                className: 'vic-platformbalk__menu-item vic-platformbalk__menu-item--uit',
                onClick: onUitloggen ? sluitEnDoe(onUitloggen) : () => setMenuOpen(false),
              },
              'Uitloggen'
            )
          )
        : null
    )
  );
}
