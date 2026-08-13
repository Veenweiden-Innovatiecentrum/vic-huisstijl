# vic-huisstijl — VIC-designsysteem

De **familie-lijm** van het VIC-platform: design tokens, merkstijl-richtlijnen en
kerncomponenten, zodat elke app (hub, innovatiegids, dashboards) er als familie uitziet.
Fase 1 van het bouwplan — zie de issues #6 t/m #9 in `vic-platform`.

## Installatie en gebruik

Het pakket heet `@veenweiden-innovatiecentrum/vic-huisstijl` (versie 0.2.0), heeft geen
build-stap en geen dependencies (React is een `peerDependency`, zie
["Componenten"](#componenten) hieronder). Installeren kan rechtstreeks via de git-URL
(registry-publicatie volgt in issue #8):

```sh
npm install github:Veenweiden-Innovatiecentrum/vic-huisstijl
```

Daarna laad je de tokens op één van deze manieren:

```css
/* Alles in één keer (fonts + kleuren + typografie + spacing): */
@import '@veenweiden-innovatiecentrum/vic-huisstijl';
```

```js
// Of vanuit JS met een bundler (Vite, webpack, …):
import '@veenweiden-innovatiecentrum/vic-huisstijl';
```

```css
/* Of per token-bestand, als je bijvoorbeeld alleen de kleuren nodig hebt: */
@import '@veenweiden-innovatiecentrum/vic-huisstijl/tokens/colors.css';
@import '@veenweiden-innovatiecentrum/vic-huisstijl/tokens/typography.css';
@import '@veenweiden-innovatiecentrum/vic-huisstijl/tokens/spacing.css';
@import '@veenweiden-innovatiecentrum/vic-huisstijl/tokens/fonts.css';
```

Zonder bundler werkt een gewone `<link rel="stylesheet">` naar `styles.css` in
`node_modules` ook. Een werkend minimaal voorbeeld staat in
[`voorbeeld/index.html`](voorbeeld/index.html). De tokens/typografie-secties werken
ook met dubbelklikken (`file://`), maar de "Componenten"-sectie gebruikt ES modules
en heeft daarom een lokale server nodig — vanuit de repo-root bijvoorbeeld:

```sh
npx serve .
# of: python3 -m http.server
```

en open dan `http://localhost:…/voorbeeld/`. Via `file://` toont die sectie een
duidelijke melding in plaats van een lege demo. `npm test` draait de validatie van
de tokens tegen het bronhandboek en van de componenten tegen de tokens
(`scripts/check-tokens.mjs` + `scripts/check-components.mjs`, kale Node, geen
dependencies).

## Welke CSS-variabelen er zijn

Alle variabelen staan op `:root` en zijn overal beschikbaar zodra de CSS geladen is.

**`tokens/colors.css`** — merkkleuren en semantische aliassen:

| Token | Waarde | Handboek-naam / betekenis |
|---|---|---|
| `--vic-green` | `#3ea635` | VIC-groen (basiskleur, primair) |
| `--vic-blue` | `#1d3176` | VIC-donkerblauw (basiskleur, primair) |
| `--vic-red` | `#cd1719` | VIC-rood (basiskleur, accent — spaarzaam) |
| `--vic-green-mid` | `#81bb63` | middengroen (steunkleur) |
| `--vic-green-soft` | `#d9e7ce` | zachtgroen (steunkleur) |
| `--vic-green-pale` | `#e8f2e5` | lichtgroen (steunkleur) |
| `--vic-brown` | `#75280e` | roodbruin (steunkleur — spaarzaam) |
| `--vic-white`, `--vic-black`, `--vic-grey`, `--vic-border` | — | neutralen (webaanvulling, niet uit het handboek) |
| `--text-body`, `--text-body-blue` | — | platte tekst: zwart óf donkerblauw |
| `--text-heading`, `--text-heading-alt`, `--text-inverse` | — | titels: groen of blauw; wit op donker |
| `--surface-page`, `--surface-tint`, `--surface-tint-strong`, `--surface-dark`, `--surface-card` | — | vlakken en achtergronden |
| `--accent`, `--link`, `--link-hover`, `--button-*`, `--focus-ring` | — | interactie |

De mapping handboek-naam ↔ token, voluit (cockpit-besluit: tokennamen blijven Engels,
niet hernoemen):

| Handboek | Token |
|---|---|
| VIC-groen | `--vic-green` |
| VIC-donkerblauw | `--vic-blue` |
| VIC-rood | `--vic-red` |
| middengroen | `--vic-green-mid` |
| zachtgroen | `--vic-green-soft` |
| lichtgroen | `--vic-green-pale` |
| roodbruin | `--vic-brown` |

**`tokens/typography.css`** — fontstacks (`--font-sans` Roboto, `--font-office`
Carlito/Calibri), maatschaal (`--text-xs` t/m `--text-display`), regelhoogtes
(`--leading-*`), letterspatiëring (`--tracking-caps`), plus de klassen `.vic-h1`,
`.vic-h2`, `.vic-h3`, `.vic-heading-site`, `.vic-kicker`, `.vic-body`,
`.vic-body-blue` en `.vic-blue-heading` die de handboekregels afdwingen
(H1/H2 in HOOFDLETTERS, groen of blauw; H3 in zinskast; platte tekst zwart of
donkerblauw).

**`tokens/spacing.css`** — spacing op 4px-basis (`--space-1` t/m `--space-9`),
hoeken (`--radius-none/-sm/-md/-pill`), terughoudende schaduwen (`--shadow-card`,
`--shadow-pop`) en layoutbreedtes (`--container`, `--container-narrow`).

**`tokens/fonts.css`** — laadt Roboto en Carlito via Google Fonts (`@import`).
Carlito is de metrisch-compatibele webvervanger van Calibri; Calibri zelf blijft de
keuze voor kantoortoepassingen (Office).

## Componenten

Sinds `0.2.0` zit de kerncomponentbibliotheek (`Button`, `DataTable`) in het pakket,
onder een eigen export zodat je ze los van de tokens kunt importeren:

```js
import { Button, DataTable } from '@veenweiden-innovatiecentrum/vic-huisstijl/components';
import '@veenweiden-innovatiecentrum/vic-huisstijl/components/components.css';
import '@veenweiden-innovatiecentrum/vic-huisstijl'; // tokens — components.css leunt erop
```

```jsx
<Button variant="primary">Neem contact op</Button>
<Button variant="link" href="/bedrijf">Zie onze activiteiten</Button>

<DataTable
  columns={['Invalshoek', 'Activiteit', 'Status']}
  rows={[
    ['Water', 'Klimaatslootjes', 'Lopend'],
    ['Bodem', 'Greppelinfiltratie', 'Afgerond'],
  ]}
/>
```

**React is een `peerDependency` (`>=18`), geen dependency** — het pakket zelf blijft
build-loos. De componentbestanden zijn kale ES-modules (`React.createElement`, geen
JSX), dus er is ook geen JSX-compilatiestap nodig om ze te consumeren; een bundler
(Vite, webpack, Next) transformeert ze net zo min als de rest van je React-code.

**Hover is CSS, geen React-state:** de oorspronkelijke `Button` hield `isHover` bij
met `useState` en berekende de hoverkleur inline. Dat is nu een CSS-klasse
(`components/core/components.css`) met een gewone `:hover`-regel op basis van de
tokens (`--button-primary-hover` etc.) — geen re-render per muisbeweging, geen state
die gesynchroniseerd moet blijven met de tokens, en de props-API blijft ongewijzigd.

**`Button`** (props uit `components/core/Button.d.ts`):

| Prop | Type | Default | Omschrijving |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'link'` | `'primary'` | Visuele variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Grootte |
| `href` | `string` | — | Rendert `<a>` in plaats van `<button>` |
| `children` | `ReactNode` | — | Inhoud van de knop |
| `className` | `string` | — | Extra class(es), toegevoegd náást de `vic-btn`-klassen (niet in plaats ervan) |
| `style` | `CSSProperties` | — | Extra inline stijl |
| `onClick` | `() => void` | — | Klik-handler |
| `disabled` | `boolean` | — | Uitgeschakeld |

Varianten: `primary` (groen), `secondary` (donkerblauw), `outline` (groene rand),
`link` (groene tekstlink met →). Copy in zinskast, nooit hoofdletters.

**`DataTable`** (props uit `components/core/DataTable.d.ts`):

| Prop | Type | Default | Omschrijving |
|---|---|---|---|
| `columns` | `ReactNode[]` | — | Kolomkoppen |
| `rows` | `ReactNode[][]` | — | Rijen als arrays van celinhoud |
| `className` | `string` | — | Extra class(es), toegevoegd náást de `vic-table`-klasse (niet in plaats ervan) |
| `style` | `CSSProperties` | — | Extra inline stijl |

Groene headerbalk, om-en-om witte/zachtgroene rijen, donkerblauwe celtekst — naar
het VIC PPT-sjabloon.

Een werkend voorbeeld met beide componenten (echt gerenderd, niet nagebouwd in CSS)
staat in [`voorbeeld/index.html`](voorbeeld/index.html), sectie "Componenten".

## Wat je níet doet

- **Kleuren mengen of verzinnen:** kies per uiting één primaire kleur (groen óf blauw),
  gebruik rood of een steunkleur alleen als accent, en laat niet meerdere kleuren door
  elkaar lopen. Geen eigen tinten naast de tokens.
- **Platte tekst in een andere kleur dan zwart of donkerblauw.**
- **Het logo vervormen:** niet uitrekken in hoogte of breedte, geen andere kleuren of
  kleurenschema's, elementen niet los van elkaar verplaatsen, geen rand eromheen.
  Geen wit logo op donkergroen; wit logo alleen op donkerblauw of een donkere foto.
- **Ronde, zwevende vormgeving:** de stijl is vlak en rechtlijnig — kleine radii,
  nauwelijks schaduw.

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
| `styles.css` | Verzamelbestand dat de vier token-bestanden importeert (het hoofd-exportpunt van het pakket) |
| `voorbeeld/` | Minimaal HTML-voorbeeld dat de tokens én de componenten laadt en toont |
| `scripts/` | `check-tokens.mjs` (tokens ↔ handboek) en `check-components.mjs` (componenten ↔ tokens, tarball) — samen `npm test` |
| `guidelines/` | 13 merkstijl-kaarten (HTML): kleuren, typografie, spacing, logo-regels, beeldmerk, pay-off, fotografie |
| `components/core/` | `Button` en `DataTable` (React) als `.js`/`.d.ts`/`components.css`, plus de oorspronkelijke `*.prompt.md`-gebruiksvoorbeelden |
| `assets/logo/` | Basislogo in alle vormen — vector (`.eps`, `.svg`, `.pdf`), druk-JPG (300 dpi) en transparante PNG's in drie maten — plus beeldmerk en mailvariant. Bron: SharePoint `VICkernteam › VIC Huisstijl › Logo's › VIC logo's` |

In het npm-pakket zitten `styles.css`, `tokens/` en `components/core/` (alleen de
`.js`/`.d.ts`/`components.css`-bestanden, niet de `.prompt.md`'s), plus
`scripts/check-tokens.mjs`, `scripts/check-components.mjs` en `bron/handboek-tekst.md`
zodat `npm test` ook in het geïnstalleerde pakket draait (zie `files` in
`package.json`); de rest is repo-materiaal.

## Wat er (nog) niet in zit — bewust

- **`VIC huisstijl 2024.pdf`** (het opgemaakte bronhandboek): de volledige tekstinhoud
  staat in `bron/handboek-tekst.md` met verwijzing naar SharePoint; het PDF-bestand zelf
  kan later nog worden toegevoegd maar is voor de bouw niet meer nodig.
- De **voorbeeldfoto's** bij de fotografie-kaart: de kaart
  (`guidelines/brand-fotografie.html`) toont daardoor nu lege beelden — de regels erin
  kloppen wel. De foto's staan in het designproject onder `assets/photos/`.
- **`components/site/`** (SiteHeader, SiteFooter, InvalshoekCard): gebouwd voor de
  Veenweideboeren-site; of ze generiek genoeg zijn voor het platform is een
  Fase 1-beslissing, geen gegeven.
- **`core.card.html`** verwijst naar de runtime van het designproject
  (`_ds_bundle.js`); het is hier referentiemateriaal, geen werkende demo.

## Onderhoud & release

Voor wie hieraan verder bouwt (mens of AI) — de regels van `AGENTS.md` in vic-platform
gelden ook hier:

- **Wijzigen** = eigen branch vanaf verse `main` → PR → Codex-review → cockpit merget.
  Nooit rechtstreeks op `main`.
- **Zelftest**: `npm test` valideert tokens tegen `bron/handboek-tekst.md` én de
  componenten (token-gebruik, varianten, ESM-markering, tarball-inhoud). Hij faalt hard
  (exitcode 1) en reist mee in het pakket. Nieuwe tokens of componenten krijgen een check
  in dezelfde stijl — mét lege-blok-guard, zie de bestaande scripts.
- **Release** = versie ophogen in `package.json` (semver: nieuwe tokens/componenten = minor,
  fixes = patch), mergen, dan een git-tag `vX.Y.Z` + GitHub-release. Apps pinnen op de tag:
  `npm install github:Veenweiden-Innovatiecentrum/vic-huisstijl#vX.Y.Z`.
- **Bron is leidend**: wijkt een token af van `bron/handboek-tekst.md`, dan wint het
  handboek — of het handboek wordt eerst bewust aangepast, nooit stilzwijgend.

## Status

`v0.2.0` (13-08-2026): tokens (#6) + componenten Button/DataTable (#7), gevalideerd en
versioned importeerbaar via git-tag (#8). Registry-publicatie (npm/GitHub Packages) is
bewust uitgesteld tot een app het nodig heeft — de git-tag-route dekt Fase 2.
