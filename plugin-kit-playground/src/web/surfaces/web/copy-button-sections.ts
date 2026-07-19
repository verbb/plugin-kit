import { copyButtonPlaygroundSections } from '../../../catalog/data/meta-copy-button.js';
import { playgroundIconClipboard } from '../../../catalog/data/icons.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import { createPkCopyButton, createPkInput } from '../../dom.js';

/** Web component previews — one function per section id from copyButtonPlaygroundSpec. */
export const copyButtonWebSectionRenderers: PlaygroundSectionRendererMap = {
    basicUsage(preview) {
        const { value } = copyButtonPlaygroundSections.basicUsage;
        const row = document.createElement('div');
        row.className = 'pg-card__inner--row';

        row.append(
            createPkInput({
                value,
                readonly: true,
                style: { width: '16rem' },
            }),
            createPkCopyButton({ value, icon: playgroundIconClipboard }),
        );

        preview.append(row);
    },

    variants(preview) {
        const { value, variants } = copyButtonPlaygroundSections.variants;

        const pairedRow = document.createElement('div');
        pairedRow.className = 'pg-card__inner--row';
        pairedRow.style.marginBottom = '0.75rem';
        pairedRow.append(
            createPkInput({
                value,
                readonly: true,
                style: { width: '16rem' },
            }),
            createPkCopyButton({ value, icon: playgroundIconClipboard }),
        );
        preview.append(pairedRow);

        const variantRow = document.createElement('div');
        variantRow.className = 'pg-card__inner--row';

        for (const variant of variants) {
            variantRow.append(createPkCopyButton({
                value,
                variant,
                icon: playgroundIconClipboard,
            }));
        }

        preview.append(variantRow);
    },
};
