import type { PlaygroundSpec } from '../catalog/types.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { tiptapContentWebSectionRenderers } from './surfaces/web/tiptap-content-sections.js';

export const tiptapContentPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'TiptapContent',
    description: 'Read-only TipTap content from the same JSON document shape used by TiptapEditor.',
} as const;

export const tiptapContentPlaygroundSections = {
    basicUsage: {
        title: 'Basic usage',
        description: 'Pass a TipTap JSON document or JSON string via the value attribute.',
    },
} as const;

export const tiptapContentSampleValue = JSON.stringify([
    {
        type: 'paragraph',
        content: [
            { type: 'text', text: 'Preview ' },
            { type: 'text', marks: [{ type: 'bold' }], text: 'content' },
            { type: 'text', text: ' without a toolbar.' },
        ],
    },
]);

export type TiptapContentSectionId = keyof typeof tiptapContentPlaygroundSections;

/** Single source of truth for TiptapContent playground section order and copy. */
export const tiptapContentPlaygroundSpec: PlaygroundSpec = {
    meta: tiptapContentPlaygroundMeta,
    sections: [
        { id: 'basicUsage', ...tiptapContentPlaygroundSections.basicUsage },
    ],
};

export function renderTiptapContentPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(tiptapContentPlaygroundSpec, tiptapContentWebSectionRenderers, root);
}
