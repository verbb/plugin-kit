#!/usr/bin/env node
/**
 * Legacy: ported ss/plugin-kit-react docs into web + thin React adapter pages.
 *
 * Prefer `sync-react-component-docs.mjs` to keep React pages aligned with web
 * (same prose, React previews, no WC intro).
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.error('port-component-docs.mjs is retired. Use sync-react-component-docs.mjs instead.');
console.error(`  node ${path.join(__dirname, 'sync-react-component-docs.mjs')}`);
process.exit(1);
