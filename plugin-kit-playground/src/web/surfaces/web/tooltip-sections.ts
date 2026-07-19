import { tooltipPlaygroundSections } from '../../../catalog/data/meta-tooltip.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import { createPkTooltip } from '../../dom.js';

/** Web component previews — one function per section id from tooltipPlaygroundSpec. */
export const tooltipWebSectionRenderers: PlaygroundSectionRendererMap = {
    basicUsage(preview) {
        const { triggerLabel, content } = tooltipPlaygroundSections.basicUsage;

        preview.append(createPkTooltip({
            id: 'pg-tooltip-basic',
            triggerLabel,
            content,
        }));
    },

    actionHints(preview) {
        const { triggerLabel, content } = tooltipPlaygroundSections.actionHints;

        preview.append(createPkTooltip({
            id: 'pg-tooltip-action',
            triggerLabel,
            triggerVariant: 'outline',
            content,
        }));
    },

    placement(preview) {
        const { sides } = tooltipPlaygroundSections.placement;
        const row = document.createElement('div');
        row.id = 'pg-tooltip-placement';
        row.className = 'pg-card__inner--row';

        for (const side of sides) {
            row.append(createPkTooltip({
                id: `pg-tooltip-${side}`,
                triggerLabel: side,
                triggerVariant: 'outline',
                placement: side,
                content: `Tooltip on the ${side}`,
            }));
        }

        preview.append(row);
    },

    keyboard(preview) {
        const { triggerLabel, content } = tooltipPlaygroundSections.keyboard;

        preview.append(createPkTooltip({
            id: 'pg-tooltip-keyboard',
            triggerLabel,
            triggerVariant: 'transparent',
            content,
        }));
    },
};
