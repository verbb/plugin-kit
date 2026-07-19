import { tooltipPlaygroundMeta, tooltipPlaygroundSections } from '../data/meta-tooltip.js';
import type { PlaygroundSpec } from '../types.js';

export type TooltipSectionId = keyof typeof tooltipPlaygroundSections;

/** Single source of truth for Tooltip playground section order and copy. */
export const tooltipPlaygroundSpec: PlaygroundSpec = {
    meta: tooltipPlaygroundMeta,
    sections: [
        { id: 'basicUsage', overflowVisible: true, ...tooltipPlaygroundSections.basicUsage },
        { id: 'actionHints', overflowVisible: true, ...tooltipPlaygroundSections.actionHints },
        { id: 'placement', overflowVisible: true, ...tooltipPlaygroundSections.placement },
        { id: 'keyboard', overflowVisible: true, ...tooltipPlaygroundSections.keyboard },
    ],
};

export const tooltipSectionIds = tooltipPlaygroundSpec.sections.map((section) => section.id);
