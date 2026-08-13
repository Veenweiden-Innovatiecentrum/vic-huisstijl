#!/usr/bin/env node
/* Valideert tokens/ tegen bron/handboek-tekst.md.
   Geen dependencies; draait met kale Node (>=18). Gebruik: npm test */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

const handboek = read('bron/handboek-tekst.md');
const colorsCss = read('tokens/colors.css');
const typographyCss = read('tokens/typography.css');
const fontsCss = read('tokens/fonts.css');

// handboek-naam ↔ token-naam (cockpit-besluit: tokennamen blijven Engels)
const mapping = {
  'VIC-groen': '--vic-green',
  'VIC-donkerblauw': '--vic-blue',
  'VIC-rood': '--vic-red',
  'middengroen': '--vic-green-mid',
  'zachtgroen': '--vic-green-soft',
  'lichtgroen': '--vic-green-pale',
  'roodbruin': '--vic-brown',
};

let failures = 0;
const ok = (label, pass, detail = '') => {
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
  if (!pass) failures++;
};

// 1. Kleurtabellen uit het handboek: | naam | CMYK | R · G · B | `#hex` |
console.log('== Kleuren: handboek ↔ tokens/colors.css ==');
const rowRe = /^\|\s*([^|]+?)\s*\|\s*C\d+[^|]*\|\s*(\d+)\s*·\s*(\d+)\s*·\s*(\d+)\s*\|\s*`(#[0-9a-f]{6})`\s*\|$/gim;
const rows = [...handboek.matchAll(rowRe)];
ok('handboek bevat 7 kleurrijen (3 basis + 4 steun)', rows.length === 7, `gevonden: ${rows.length}`);

for (const [, name, r, g, b, hex] of rows) {
  const token = mapping[name];
  if (!token) { ok(`mapping voor "${name}"`, false, 'geen token-naam bekend'); continue; }

  const rgbHex = '#' + [r, g, b].map((n) => Number(n).toString(16).padStart(2, '0')).join('');
  ok(`${name}: RGB ${r}·${g}·${b} komt overeen met ${hex}`, rgbHex === hex.toLowerCase(), `RGB→hex = ${rgbHex}`);

  const m = colorsCss.match(new RegExp(`${token}:\\s*(#[0-9a-fA-F]{6})`));
  ok(`${name} ↔ ${token}`, !!m && m[1].toLowerCase() === hex.toLowerCase(),
     m ? `token = ${m[1]}, handboek = ${hex}` : 'token niet gevonden');
}

// 2. Typografieregels uit het handboek
console.log('\n== Typografie: regels uit het handboek ==');
const block = (sel) => typographyCss.match(new RegExp(`${sel.replace('.', '\\.')}\\s*{[^}]*}`, 's'))?.[0] ?? '';
const h1 = block('.vic-h1'), h2 = block('.vic-h2'), h3 = block('.vic-h3'), body = block('.vic-body');

ok('klassen .vic-h1/.vic-h2/.vic-h3/.vic-body bestaan',
   [h1, h2, h3, body].every((b) => b.length > 0));
ok('H1 in HOOFDLETTERS', /text-transform:\s*uppercase/.test(h1));
ok('H1 groen (of blauw via --text-heading/-alt)', /var\(--text-heading\)/.test(h1));
ok('H2 in HOOFDLETTERS', /text-transform:\s*uppercase/.test(h2));
ok('H2 groen (of blauw via --text-heading/-alt)', /var\(--text-heading\)/.test(h2));
ok('H3 zinskast (géén uppercase)', h3.length > 0 && !/text-transform:\s*uppercase/.test(h3));
ok('platte tekst via --text-body (zwart), blauw-variant beschikbaar',
   /var\(--text-body\)/.test(body) && /\.vic-body-blue\s*{\s*color:\s*var\(--text-body-blue\)/.test(typographyCss));
ok('platte tekst zwart óf donkerblauw als alias',
   /--text-body:\s*var\(--vic-black\)/.test(colorsCss) && /--text-body-blue:\s*var\(--vic-blue\)/.test(colorsCss));
ok('--text-heading wijst naar VIC-groen', /--text-heading:\s*var\(--vic-green\)/.test(colorsCss));
ok('--text-heading-alt wijst naar VIC-donkerblauw', /--text-heading-alt:\s*var\(--vic-blue\)/.test(colorsCss));
ok('--text-inverse wijst naar wit', /--text-inverse:\s*var\(--vic-white\)/.test(colorsCss));

// 3. Fontkeuzes
console.log('\n== Fonts ==');
const importUrl = fontsCss.match(/@import\s+url\(['"]?(https:\/\/fonts\.googleapis\.com[^'")]+)/)?.[1] ?? '';
ok('Google Fonts-import aanwezig', importUrl.length > 0);
ok('Roboto in de import-URL', /family=Roboto([:&]|$)/.test(importUrl));
ok('Carlito (metrisch gelijk aan Calibri) in de import-URL', /family=Carlito([:&]|$)/.test(importUrl));
ok('--font-sans = Roboto', /--font-sans:\s*'Roboto'/.test(typographyCss));
ok("--font-office = Carlito/Calibri", /--font-office:\s*'Carlito',\s*'Calibri'/.test(typographyCss));

// 4. Vlakke, rechtlijnige stijl
console.log('\n== Stijl: vlak en rechtlijnig ==');
const spacingCss = read('tokens/spacing.css');
ok('radius-none aanwezig, kleine radii (sm ≤ 4px)', /--radius-none:\s*0px/.test(spacingCss) && /--radius-sm:\s*4px/.test(spacingCss));
const alphas = [...spacingCss.matchAll(/rgba\([^)]*,\s*(0\.\d+)\)/g)];
ok('schaduwen terughoudend (alpha ≤ 0.16)',
   alphas.length > 0 && alphas.every((m) => Number(m[1]) <= 0.16));

console.log(`\n${failures === 0 ? 'ALLE CHECKS GESLAAGD' : `${failures} CHECK(S) GEFAALD`}`);
process.exit(failures === 0 ? 0 : 1);
