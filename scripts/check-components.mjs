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

// 4. Barrel-export
console.log('\n== index.js: barrel-export ==');
const indexJs = files['components/core/index.js'];
ok('index.js exporteert Button', /export\s*\{\s*Button\s*\}/.test(indexJs));
ok('index.js exporteert DataTable', /export\s*\{\s*DataTable\s*\}/.test(indexJs));

// 5. package.json: components-export, peerDependency, versie
console.log('\n== package.json: components-export en peerDependency ==');
const pkg = JSON.parse(read('package.json'));
ok('exports bevat "./components"', !!pkg.exports?.['./components']);
ok('exports bevat "./components/components.css"', !!pkg.exports?.['./components/components.css']);
ok('peerDependencies.react is ">=18"', /^>=\s*18/.test(pkg.peerDependencies?.react ?? ''));
ok('react staat niet als (dev)dependency', !pkg.dependencies?.react && !pkg.devDependencies?.react);
ok('versie is 0.2.0', pkg.version === '0.2.0');

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
      'components/core/index.js',
      'components/core/Button.d.ts',
      'components/core/DataTable.d.ts',
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
