import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const version = JSON.parse(await readFile(join(root, 'package.json'), 'utf8')).version;

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, 'site'), { recursive: true });
await cp(join(root, 'index.html'), join(dist, 'site', 'index.html'));
await cp(join(root, 'src'), join(dist, 'site', 'src'), { recursive: true });
await cp(join(root, 'vendor'), join(dist, 'site', 'vendor'), { recursive: true });

let html = await readFile(join(root, 'index.html'), 'utf8');
const css = await readFile(join(root, 'src', 'styles.css'), 'utf8');
const jszip = await readFile(join(root, 'vendor', 'jszip.min.js'), 'utf8');
const app = await readFile(join(root, 'src', 'app.js'), 'utf8');
html = html
  .replace('<link rel="stylesheet" href="./src/styles.css">', () => `<style>\n${css}</style>`)
  .replace('<script src="./vendor/jszip.min.js"></script>', () => `<script>${jszip}</script>`)
  .replace('<script src="./src/app.js"></script>', () => `<script>\n${app}</script>`);
const standalone = join(dist, `ProductionHub_v${version.replace(/\.0$/, '')}.html`);
await writeFile(standalone, html, 'utf8');
console.log(`Built static site: ${join(dist, 'site')}`);
console.log(`Built standalone app: ${standalone}`);
