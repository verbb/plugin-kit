import { statusPlaygroundVariants } from '../../../catalog/data/meta-status.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import { createPkStatus } from '../../dom.js';

/** Web component previews — one function per section id from statusPlaygroundSpec. */
export const statusWebSectionRenderers: PlaygroundSectionRendererMap = {
    variants(preview) {
        const grid = document.createElement('div');
        grid.className = 'pg-status-grid pg-status-grid--variants';

        for (const status of statusPlaygroundVariants) {
            grid.append(createPkStatus({ status }));
        }

        preview.append(grid);
    },
};
