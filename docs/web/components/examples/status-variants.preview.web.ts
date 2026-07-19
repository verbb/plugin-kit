import type { PkStatusVariant } from '@verbb/plugin-kit-web/components/status/pk-status.js';
import '@verbb/plugin-kit-web/components/status/pk-status.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

/** Full built-in status aliases — same set as the playground / published docs. */
const statusVariants = [
    'all',
    'on',
    'live',
    'active',
    'enabled',
    'off',
    'suspended',
    'expired',
    'warning',
    'pending',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'turquoise',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'light',
    'gray',
    'grey',
    'white',
    'black',
    'disabled',
    'inactive',
] as const satisfies readonly PkStatusVariant[];

function buildVariantsHtml(): string {
    const tiles = statusVariants.map((status) => {
        return [
            `<div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#374151">`,
            `  <pk-status status="${status}" aria-label="${status}"></pk-status>`,
            `  <span>${status}</span>`,
            `</div>`,
        ].join('\n');
    });

    return [
        '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(9rem,1fr));gap:12px;width:100%">',
        ...tiles,
        '</div>',
    ].join('\n');
}

export default defineWebPreview({
    label: 'Variants',
    title: 'Variants example',
    layout: 'plain',
    // Short snippet in the code panel — the live preview lists every built-in alias.
    code: '<pk-status status="live" aria-label="live"></pk-status>',
    html: buildVariantsHtml(),
});
