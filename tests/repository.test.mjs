import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const load = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('entry page loads local assets in dependency order', async () => {
  const html = await load('index.html');
  const css = html.indexOf('./src/styles.css');
  const zip = html.indexOf('./vendor/jszip.min.js');
  const app = html.indexOf('./src/app.js');
  assert.ok(css > 0 && zip > css && app > zip);
  assert.match(html, /<div id="app" class="app hidden">/);
});

test('application keeps the v0.24 storage contract', async () => {
  const app = await load('src/app.js');
  assert.match(app, /const KEY = 'productionHub\.v1';/);
  assert.match(app, /const UIKEY = 'productionHub\.ui';/);
  assert.match(app, /function migrate\(x\)/);
  assert.match(app, /x\.version = 21;/);
  assert.match(app, /db\.version !== 21/);
  assert.match(app, /localStorage\.getItem/);
  assert.match(app, /localStorage\.setItem/);
});

test('vendored JSZip remains available offline', async () => {
  const source = await load('vendor/jszip.min.js');
  assert.match(source, /JSZip v3\.10\.2/);
  assert.match(source, /JSZip/);
});

test('split sources reproduce the original standalone file byte-for-byte', async () => {
  const [index, css, jszip, app, baseline] = await Promise.all([
    load('index.html'),
    load('src/styles.css'),
    load('vendor/jszip.min.js'),
    load('src/app.js'),
    load('standalone/ProductionHub_v0.24.html')
  ]);
  const rebuilt = index
    .replace('<link rel="stylesheet" href="./src/styles.css">', () => `<style>\n${css}</style>`)
    .replace('<script src="./vendor/jszip.min.js"></script>', () => `<script>${jszip}</script>`)
    .replace('<script src="./src/app.js"></script>', () => `<script>\n${app}</script>`);
  assert.equal(rebuilt, baseline);
});
