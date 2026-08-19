#!/usr/bin/env node
/* Valideert components/core/ (Button, DataTable) op dezelfde manier als
   check-tokens.mjs de tokens valideert: tokens-only styling, gedocumenteerde
   varianten en aanwezigheid in de tarball. Geen dependencies, kale Node (>=18). */
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

let failures = 0;
const ok = (label, pass, detail = '') => {
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
  if (!pass) failures++;
};

const files = {
  'components/core/Button.js': read('components/core/Button.js'),
  'components/core/DataTable.js': read('components/core/DataTable.js'),
  'components/core/PlatformBalk.js': read('components/core/PlatformBalk.js'),
  'components/core/index.js': read('components/core/index.js'),
  'components/core/components.css': read('components/core/components.css'),
};

// 1. Uitsluitend tokens: geen hardcoded kleuren (behalve wit)
console.log('== Componenten: uitsluitend token-variabelen, geen hardcoded kleuren (behalve wit) ==');
const hexRe = /#[0-9a-fA-F]{3,8}\b/g;
const rgbRe = /rgba?\([^)]*\)/g;
const isWhiteHex = (h) => /^#(fff|ffffff)$/i.test(h);
const isWhiteRgb = (v) => /^rgba?\(\s*255\s*,\s*255\s*,\s*255\s*(,\s*[\d.]+\s*)?\)$/i.test(v);

for (const [path, content] of Object.entries(files)) {
  const hexHits = [...content.matchAll(hexRe)].map((m) => m[0]).filter((h) => !isWhiteHex(h));
  ok(`${path}: geen hardcoded hex-kleuren (behalve wit)`, hexHits.length === 0, hexHits.join(', '));

  const rgbHits = [...content.matchAll(rgbRe)].map((m) => m[0]).filter((v) => !isWhiteRgb(v));
  ok(`${path}: geen hardcoded rgb(a)-kleuren (behalve wit)`, rgbHits.length === 0, rgbHits.join(', '));
}

// 2. Gedocumenteerde Button-varianten en -sizes bestaan
console.log('\n== Button: gedocumenteerde varianten en sizes ==');
const buttonJs = files['components/core/Button.js'];
const componentsCss = files['components/core/components.css'];
const buttonDts = read('components/core/Button.d.ts');

ok('Button.js bouwt className via variant-template', /vic-btn--\$\{variant\}/.test(buttonJs));
ok('Button.js bouwt className via size-template', /vic-btn--\$\{size\}/.test(buttonJs));

const variants = ['primary', 'secondary', 'outline', 'link'];
for (const v of variants) {
  ok(`variant "${v}" gestyled in components.css`, new RegExp(`\\.vic-btn--${v}\\b`).test(componentsCss));
  ok(`variant "${v}" gedocumenteerd in Button.d.ts`, buttonDts.includes(`'${v}'`));
}

const sizes = ['sm', 'md', 'lg'];
for (const s of sizes) {
  ok(`size "${s}" gestyled in components.css`, new RegExp(`\\.vic-btn--${s}\\b`).test(componentsCss));
  ok(`size "${s}" gedocumenteerd in Button.d.ts`, buttonDts.includes(`'${s}'`));
}

// 3. DataTable: structuur en zebra-rijen
console.log('\n== DataTable: structuur en zebra-rijen ==');
const dataTableJs = files['components/core/DataTable.js'];
ok('DataTable.js rendert thead en tbody', /thead/.test(dataTableJs) && /tbody/.test(dataTableJs));
ok('zebra-rijen (odd/even) gestyled in components.css',
   /nth-child\(odd\)/.test(componentsCss) && /nth-child\(even\)/.test(componentsCss));

// 3a. DataTable: klikbare rijen zijn ook toetsenbord-bedienbaar (vic-platform#53)
console.log('\n== DataTable: klikbare rijen — toetsenbord en zichtbare focus ==');
const dataTableDts = read('components/core/DataTable.d.ts');
ok('rij krijgt role="button" alleen als onRowClick is gezet',
   /rowProps\.role = 'button'/.test(dataTableJs) && /if \(clickable\)/.test(dataTableJs));
ok('rij krijgt tabIndex 0 alleen als onRowClick is gezet', /rowProps\.tabIndex = 0/.test(dataTableJs));
ok('Enter activeert de rij', /e\.key === 'Enter'/.test(dataTableJs));
ok('spatie activeert de rij (naast Enter, net als een echte knop)', /e\.key === ' '/.test(dataTableJs));
ok('keydown-handler doet preventDefault (geen paginascroll bij spatie)',
   /onKeyDown[\s\S]{0,120}preventDefault/.test(dataTableJs));
ok('rij zonder onRowClick blijft een gewone <tr> (tabIndex/role alleen gezet binnen if (clickable))',
   /const rowProps = \{\s*\n\s*key,\s*\n\s*className:/.test(dataTableJs) &&
   /if \(clickable\) \{\s*\n\s*rowProps\.tabIndex = 0/.test(dataTableJs));
ok('rowKey bepaalt de sleutel per rij (default: rij-index, zoals nu)',
   /rowKey \? rowKey\(row, r\) : r/.test(dataTableJs));
ok('rowClassName geeft optioneel een class per rij (voor markeringen)',
   /rowClassName \? rowClassName\(row, r\) : undefined/.test(dataTableJs));
ok('zichtbare focus (focus-visible) gestyled in components.css voor klikbare rijen',
   /\.vic-table tbody tr\.vic-table__row--clickable:focus-visible/.test(componentsCss) &&
   /box-shadow:\s*var\(--focus-ring\)/.test(componentsCss));
ok('onRowClick gedocumenteerd in DataTable.d.ts', /onRowClick\?:/.test(dataTableDts));
ok('rowKey gedocumenteerd in DataTable.d.ts', /rowKey\?:/.test(dataTableDts));
ok('rowClassName gedocumenteerd in DataTable.d.ts', /rowClassName\?:/.test(dataTableDts));

// 3b. PlatformBalk: toegankelijkheid en href/onClick-keuze (vic-platform#61)
console.log('\n== PlatformBalk: toegankelijkheid en gedrag ==');
const platformBalkJs = files['components/core/PlatformBalk.js'];
const platformBalkCss = componentsCss;
ok('avatarknop heeft aria-haspopup="menu"', /'aria-haspopup':\s*'menu'/.test(platformBalkJs));
ok('avatarknop heeft aria-expanded gekoppeld aan state', /'aria-expanded':\s*menuOpen/.test(platformBalkJs));
ok('Escape sluit het menu', /e\.key === 'Escape'/.test(platformBalkJs));
ok('klik buiten het menu sluit het (mousedown + contains-check)',
   /addEventListener\('mousedown'/.test(platformBalkJs) && /\.contains\(/.test(platformBalkJs));
ok('focus gaat terug naar de avatarknop na Escape', /avatarKnopRef\.current\?\.focus\(\)/.test(platformBalkJs));
ok('menu-items hebben role="menuitem"', /role:\s*'menuitem'/.test(platformBalkJs));
ok('"Uitloggen" kiest href óf onClick net als Button (href/onClick-keuze)',
   /onUitloggen \? 'button' : 'a'/.test(platformBalkJs));
ok('focus-visible zichtbaar op avatarknop en menu-items in components.css',
   /\.vic-platformbalk__avatar:focus-visible/.test(platformBalkCss) &&
   /\.vic-platformbalk__menu-item:focus-visible/.test(platformBalkCss));
ok('appnaam valt weg op smal scherm (media query)',
   /@media[^{]*\{\s*\.vic-platformbalk__appnaam\s*\{\s*display:\s*none/.test(platformBalkCss));

// 4. Barrel-export
console.log('\n== index.js: barrel-export ==');
const indexJs = files['components/core/index.js'];
ok('index.js exporteert Button', /export\s*\{\s*Button\s*\}/.test(indexJs));
ok('index.js exporteert DataTable', /export\s*\{\s*DataTable\s*\}/.test(indexJs));
ok('index.js exporteert PlatformBalk', /export\s*\{\s*PlatformBalk\s*\}/.test(indexJs));

// 4b. className: consumer mag eigen classes toevoegen zonder de vic-klassen te wissen
// (regressie: ...rest ná className gespreid overschrijft className stilletjes — zie PR #7-review)
console.log('\n== className: consumer-className clobbert de VIC-klassen niet ==');
const buttonParams = buttonJs.match(/export function Button\(\{([^}]*)\}\)/s)?.[1] ?? '';
ok('Button.js heeft className als eigen (niet-rest) prop', /\bclassName\b/.test(buttonParams));
ok('Button.js spreidt ...rest ná className (className kan niet via rest clobberen)',
   /\bclassName\b[\s\S]*\.\.\.rest/.test(buttonParams));
ok('Button.js merget className in de class-string (filter(Boolean).join)',
   /className\s*\]\s*\.filter\(Boolean\)\.join\(' '\)/.test(buttonJs));

const dataTableParams = dataTableJs.match(/export function DataTable\(\{([^}]*)\}\)/s)?.[1] ?? '';
ok('DataTable.js heeft className als eigen prop', /\bclassName\b/.test(dataTableParams));
ok('DataTable.js merget className in de class-string (filter(Boolean).join)',
   /className\s*\]\s*\.filter\(Boolean\)\.join\(' '\)/.test(dataTableJs));

const platformBalkParams = platformBalkJs.match(/export function PlatformBalk\(\{([^}]*)\}\)/s)?.[1] ?? '';
ok('PlatformBalk.js heeft className als eigen prop', /\bclassName\b/.test(platformBalkParams));
ok('PlatformBalk.js merget className in de class-string (filter(Boolean).join)',
   /className\s*\]\s*\.filter\(Boolean\)\.join\(' '\)/.test(platformBalkJs));

// 5. package.json: components-export, peerDependency, ESM, versie
console.log('\n== package.json: components-export, peerDependency, ESM ==');
const pkg = JSON.parse(read('package.json'));
ok('exports bevat "./components"', !!pkg.exports?.['./components']);
ok('exports bevat "./components/components.css"', !!pkg.exports?.['./components/components.css']);
ok('peerDependencies.react is ">=18"', /^>=\s*18/.test(pkg.peerDependencies?.react ?? ''));
ok('react staat niet als (dev)dependency', !pkg.dependencies?.react && !pkg.devDependencies?.react);
ok('"type": "module" staat op pakketniveau (anders CJS-parsefout op Node 18/20 bij import/export)',
   pkg.type === 'module');
// Geen hard-gecodeerde versie: dat brak de releaseprocedure bij elke bump (Codex, PR #5).
ok('versie is geldige semver (X.Y.Z)', /^\d+\.\d+\.\d+$/.test(pkg.version ?? ''));

// 6. Tarball: componentbestanden zitten daadwerkelijk in npm pack
console.log('\n== Tarball: componentbestanden zitten in npm pack --dry-run ==');
let packOutput = '';
let packRan = true;
try {
  packOutput = execFileSync('npm', ['pack', '--dry-run', '--json'], { cwd: root, encoding: 'utf8' });
} catch {
  packRan = false;
}
ok('npm pack --dry-run draait zonder fout', packRan);

if (packRan) {
  let fileList = [];
  try {
    fileList = JSON.parse(packOutput)[0]?.files?.map((f) => f.path) ?? [];
  } catch {
    fileList = [];
  }
  ok('npm pack retourneert een bestandslijst', fileList.length > 0, `${fileList.length} bestanden`);

  if (fileList.length > 0) {
    const expected = [
      'components/core/Button.js',
      'components/core/DataTable.js',
      'components/core/PlatformBalk.js',
      'components/core/index.js',
      'components/core/Button.d.ts',
      'components/core/DataTable.d.ts',
      'components/core/PlatformBalk.d.ts',
      'components/core/index.d.ts',
      'components/core/components.css',
      'scripts/check-components.mjs',
    ];
    for (const f of expected) {
      ok(`tarball bevat ${f}`, fileList.includes(f));
    }
  }
}

console.log(`\n${failures === 0 ? 'ALLE CHECKS GESLAAGD' : `${failures} CHECK(S) GEFAALD`}`);
process.exit(failures === 0 ? 0 : 1);
