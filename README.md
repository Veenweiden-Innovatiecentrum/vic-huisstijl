# vic-huisstijl — VIC-designsysteem

De **familie-lijm** van het VIC-platform: design tokens, merkstijl-richtlijnen en
kerncomponenten, zodat elke app (hub, innovatiegids, dashboards) er als familie uitziet.
Fase 1 van het bouwplan — zie de issues #6 t/m #9 in `vic-platform`.

## Herkomst van dit materiaal

Overgezet uit het Claude for Design-project **"VIC Design System"** (eigenaar: Tim,
laatst bijgewerkt 22 juni 2026), dat op zijn beurt is opgebouwd uit
`VIC huisstijl 2024.pdf` (het logo-handboek). De cockpit heeft dit 1-op-1 overgebracht —
**niets herontworpen**. Het Veenweideboeren-projectwerk uit dat designproject is bewust
niet meegekomen; dit is alleen de herbruikbare huisstijl.

## Wat er in zit

| Map | Inhoud |
|---|---|
| `tokens/` | Design tokens als CSS-variabelen: `colors.css`, `typography.css`, `spacing.css`, `fonts.css` |
| `styles.css` | Verzamelbestand dat de vier token-bestanden importeert |
| `guidelines/` | 13 merkstijl-kaarten (HTML): kleuren, typografie, spacing, logo-regels, beeldmerk, pay-off, fotografie |
| `components/core/` | `Button` en `DataTable` (React), elk met typedefinitie en gebruiksvoorbeeld (`*.prompt.md`) |
| `assets/logo/` | `VIC_Basislogo.png` en `VIC_Beeldmerk.png` |

## Wat er (nog) niet in zit — bewust

- **`VIC huisstijl 2024.pdf`** (het bronhandboek) en de **voorbeeldfoto's** bij de
  fotografie-kaart: groter dan de 256 KB-overdrachtslimiet van de design-koppeling.
  Ze staan in het designproject (`uploads/` en `assets/photos/`); los aanleveren kan
  via SharePoint of handmatig. De fotografie-kaart (`guidelines/brand-fotografie.html`)
  toont daardoor nu lege beelden — de regels erin kloppen wel.
- **`components/site/`** (SiteHeader, SiteFooter, InvalshoekCard): gebouwd voor de
  Veenweideboeren-site; of ze generiek genoeg zijn voor het platform is een
  Fase 1-beslissing, geen gegeven.
- **`core.card.html`** verwijst naar de runtime van het designproject
  (`_ds_bundle.js`); het is hier referentiemateriaal, geen werkende demo.

## Status

Dit is **bronmateriaal**, nog geen pakket. Issue #6/#7/#8 in `vic-platform` maken hier
een versioned, installeerbaar pakket van. Tot die tijd: niets hieruit consumeren.
