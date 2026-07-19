import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { PK_COMPONENT_TAGS } from '../src/component-registry.ts';
import { FOUCE_COLLAPSE_TAGS, FOUCE_PANEL_TAGS, FOUCE_TRIGGER_OVERLAY_TAGS } from '../src/utilities/fouce-strategy.ts';

const FOUCE_TIMEOUT = '2s';

const COLLAPSE_TAGS = new Set<string>(FOUCE_COLLAPSE_TAGS);
const TRIGGER_OVERLAY_TAGS = new Set<string>(FOUCE_TRIGGER_OVERLAY_TAGS);

const indent = (tags: readonly string[]): string => tags.map((tag) => `        ${tag}`).join(',\n');

/**
 * Builds the FOUCE (Flash of Undefined Custom Elements) stylesheet.
 *
 * Tiers:
 *   1a. Reserve — in-flow `pk-*` elements hidden via `visibility` until upgrade.
 *   1b. Collapse — out-of-flow overlays hidden via `display: none` until upgrade.
 *   2.  Cloak — `.pk-cloak` hides a wider wrapper until all pk descendants upgrade.
 *
 * Reserve + cloak self-heal the instant elements register and reveal after the
 * timeout regardless (step-end animation, no `forwards` fill) so a failed import
 * can't leave the UI permanently blank.
 */
export function generateFouceCss(tags: readonly string[] = PK_COMPONENT_TAGS): string {
    const reserveTags = tags.filter((tag) => !COLLAPSE_TAGS.has(tag) && !TRIGGER_OVERLAY_TAGS.has(tag));
    const collapseTags = tags.filter((tag) => COLLAPSE_TAGS.has(tag));

    const collapseBlock =
        collapseTags.length === 0
            ? ''
            : `
    /* Tier 1b: collapse out-of-flow overlays until they upgrade. */
    :is(
${indent(collapseTags)}
    ):not(:defined) {
        display: none;
    }
`;

    const triggerOverlayBlock =
        FOUCE_TRIGGER_OVERLAY_TAGS.length === 0
            ? ''
            : `
    /*
     * Tier 1c: trigger + overlay components. The host reserves space for the
     * trigger (tier 1a), but the overlay panel content (default-slot children)
     * only shows on interaction — collapse it so we don't reserve a wrong-sized
     * box that shifts the layout on upgrade.
     */
    :is(
${indent(FOUCE_TRIGGER_OVERLAY_TAGS)}
    ):not(:defined) > :not([slot='trigger']) {
        display: none;
    }
`;

    const panelBlock =
        FOUCE_PANEL_TAGS.length === 0
            ? ''
            : `
    /*
     * Tier 1d: listbox-style controls (select, combobox, …). Reserve the control
     * host (tier 1a), but collapse the default-slot option list so it can never
     * dump into the flow — including after the 2s reserve cap. Named-slot
     * decorations are left alone.
     */
    :is(
${indent(FOUCE_PANEL_TAGS)}
    ):not(:defined) > :not([slot]) {
        display: none;
    }
`;

    return `@layer pk-utilities {
    /*
     * FOUCE (Flash of Undefined Custom Elements) prevention.
     *
     * GENERATED FILE — do not edit by hand.
     * Run \`npm run gen:fouce\` after changing the component registry.
     */

    /* Tier 1a: reserve space for in-flow pk-* elements until they upgrade. */
    :is(
${indent(reserveTags)}
    ):not(:defined) {
        animation: ${FOUCE_TIMEOUT} step-end pk-fouce;
    }
${collapseBlock}${triggerOverlayBlock}${panelBlock}
    /* Tier 2: hide a wrapper/page until all pk-* descendants upgrade. */
    .pk-cloak:has(:not(:defined)) {
        animation: ${FOUCE_TIMEOUT} step-end pk-fouce;
    }

    @keyframes pk-fouce {
        from {
            visibility: hidden;
        }
    }
}
`;
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isMain) {
    const outPath = path.resolve(fileURLToPath(import.meta.url), '../../src/styles/utilities/fouce.css');
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, generateFouceCss(), 'utf8');
    console.log(`Generated ${path.relative(process.cwd(), outPath)} (${PK_COMPONENT_TAGS.length} tags)`);
}
