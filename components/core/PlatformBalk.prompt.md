Gedeelde platformbalk voor hub, gids en VIA | Collect (vic-platform#61): VIC-beeldmerk + optionele appnaam links (appnaam valt als eerste weg op een smal scherm), een `children`-slot in het midden voor app-eigen knoppen, en uiterst rechts een rondje met initialen dat uitklapt naar naam/e-mailadres, optionele menu-extra's en uitloggen. Logo-klik gaat altijd naar de hub. Plain React, geen framework-specifieke imports — werkt zowel in Next.js (hub, gids) als in Vite (VIA | Collect).

**Hub** — geen appnaam, geen app-eigen knoppen:

```jsx
<PlatformBalk
  naam="Tim Selders"
  email="tim@veenweiden.nl"
  uitlogUrl="/api/auth/signout"
/>
```

**Innovatieveld-gids** — appnaam, taalknop en (voor wie de rol heeft) Beheer als menu-extra:

```jsx
<PlatformBalk
  appNaam="Innovatieveld"
  naam={naam}
  email={email}
  uitlogUrl="/api/auth/signout"
  menuExtras={isBeheerder ? [{ label: 'Beheer', href: '/beheer' }] : []}
>
  <LanguageToggle />
</PlatformBalk>
```

**VIA | Collect** — appnaam, eigen navigatie als `children`, "Wachtwoord wijzigen" als menu-extra en een callback-uitlogstap (eigen `/auth/logout`-aanroep vóór de navigatie):

```jsx
<PlatformBalk
  appNaam="VIA | Collect"
  naam={naam}
  email={email}
  onUitloggen={() => void uitloggen()}
  menuExtras={[{ label: 'Wachtwoord wijzigen', onClick: () => setWachtwoordOpen(true) }]}
>
  <button type="button" onClick={() => onNav('collect')}>VIA | collect</button>
  <button type="button" onClick={() => onNav('handleiding')}>Handleiding</button>
</PlatformBalk>
```

`onUitloggen` heeft voorrang op `uitlogUrl` ("Uitloggen" rendert dan als `<button>` in plaats van `<a href>`) — zelfde href/onClick-keuze als `Button`. Toegankelijk: `aria-expanded` op de accountknop, Escape sluit het menu (focus terug naar de knop), een klik buiten het menu sluit het, en alles is met het toetsenbord te bedienen.
