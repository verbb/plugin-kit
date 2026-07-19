import { h, type Component, type CSSProperties } from 'vue';

import type { VuePreviewSourceDefinition } from './codeBlocks';

type CreateVueSfcPreviewOptions = {
    label: string;
    title?: string;
    /** Compiled SFC used for the live preview mount. */
    example: Component;
    /** Raw SFC text shown in the code block (`import … from './x.example.vue?raw'`). */
    source: string;
    /** Optional layout chrome around the example (not part of the copyable SFC). */
    wrapStyle?: CSSProperties;
    note?: string;
};

/**
 * Vue docs preview where the copyable source is a real `<script setup>` SFC
 * and the live demo mounts that same component.
 */
export function createVueSfcPreview({
    label,
    title,
    example,
    source,
    wrapStyle,
    note,
}: CreateVueSfcPreviewOptions): VuePreviewSourceDefinition {
    return {
        label,
        title: title ?? `${label} example`,
        language: 'vue',
        kind: 'vue',
        code: source.replace(/^\uFEFF/, '').trim(),
        note,
        render: () => (wrapStyle ? h('div', { style: wrapStyle }, [h(example)]) : h(example)),
    };
}
