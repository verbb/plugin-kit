import { separatorPlaygroundSections } from '../../../catalog/data/meta-separator.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import { createPkSeparator } from '../../dom.js';

/** Web component previews — one function per section id from separatorPlaygroundSpec. */
export const separatorWebSectionRenderers: PlaygroundSectionRendererMap = {
    horizontal(preview) {
        const { above, below } = separatorPlaygroundSections.horizontal;

        const aboveEl = document.createElement('p');
        aboveEl.style.margin = '0 0 12px';
        aboveEl.textContent = above;

        const belowEl = document.createElement('p');
        belowEl.style.margin = '12px 0 0';
        belowEl.textContent = below;

        preview.append(aboveEl, createPkSeparator(), belowEl);
    },

    vertical(preview) {
        const row = document.createElement('div');
        row.className = 'pg-separator-row';

        separatorPlaygroundSections.vertical.items.forEach((item, index) => {
            if (index > 0) {
                row.append(createPkSeparator({ orientation: 'vertical' }));
            }

            const label = document.createElement('span');
            label.textContent = item;
            row.append(label);
        });

        preview.append(row);
    },
};
