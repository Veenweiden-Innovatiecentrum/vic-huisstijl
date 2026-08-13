# vic-huisstijl — VIC-designsysteem

De **familie-lijm** van het VIC-platform: design tokens, merkstijl-richtlijnen en
kerncomponenten, zodat elke app (hub, innovatiegids, dashboards) er als familie uitziet.
Fase 1 van het bouwplan — zie de issues #6 t/m #9 in `vic-platform`.

## Installatie en gebruik

Het pakket heet `@veenweiden-innovatiecentrum/vic-huisstijl` (versie 0.1.0), heeft geen
build-stap en geen dependencies. Installeren kan rechtstreeks via de git-URL
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
[`voorbeeld/index.html`](voorbeeld/index.html); open het lokaal in een browser.
`npm test` draait de validatie van de tokens tegen het bronhandboek
(`scripts/check-tokens.mjs`, kale Node, geen dependencies).

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
| `voorbeeld/` | Minimaal HTML-voorbeeld dat de tokens laadt en de kernstijlen toont |
| `scripts/` | `check-tokens.mjs`: valideert de tokens tegen `bron/handboek-tekst.md` (`npm test`) |
| `guidelines/` | 13 merkstijl-kaarten (HTML): kleuren, typografie, spacing, logo-regels, beeldmerk, pay-off, fotografie |
| `components/core/` | `Button` en `DataTable` (React), elk met typedefinitie en gebruiksvoorbeeld (`*.prompt.md`) |
| `assets/logo/` | Basislogo in alle vormen — vector (`.eps`, `.svg`, `.pdf`), druk-JPG (300 dpi) en transparante PNG's in drie maten — plus beeldmerk en mailvariant. Bron: SharePoint `VICkernteam › VIC Huisstijl › Logo's › VIC logo's` |

In het npm-pakket zelf zitten alleen `styles.css` en `tokens/` (zie `files` in
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

## Status

Sinds issue #6 is dit een **installeerbaar pakket** (`0.1.0`, via git-URL). De tokens
zijn gevalideerd tegen het bronhandboek (`npm test`). Issue #7 voegt de resterende
onderdelen toe; issue #8 regelt registry-publicatie.
