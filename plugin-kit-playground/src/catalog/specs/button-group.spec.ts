import { buttonGroupPlaygroundMeta, buttonGroupPlaygroundSections } from '../data/meta-button-group.js';
import type { PlaygroundSpec } from '../types.js';

export type ButtonGroupSectionId = keyof typeof buttonGroupPlaygroundSections;

/** Single source of truth for Button Group playground section order and copy. */
export const buttonGroupPlaygroundSpec: PlaygroundSpec = {
    meta: buttonGroupPlaygroundMeta,
    sections: [
        { id: 'craftComparison', bare: true, ...buttonGroupPlaygroundSections.craftComparison },
        { id: 'basicUsage', ...buttonGroupPlaygroundSections.basicUsage },
        { id: 'menuTrigger', ...buttonGroupPlaygroundSections.menuTrigger },
        { id: 'regularButtons', ...buttonGroupPlaygroundSections.regularButtons },
        { id: 'separators', ...buttonGroupPlaygroundSections.separators },
        { id: 'variants', ...buttonGroupPlaygroundSections.variants },
        { id: 'splitActions', ...buttonGroupPlaygroundSections.splitActions },
        { id: 'sizes', ...buttonGroupPlaygroundSections.sizes },
        { id: 'orientation', ...buttonGroupPlaygroundSections.orientation },
        { id: 'toolbarControls', ...buttonGroupPlaygroundSections.toolbarControls },
        { id: 'dropdown', overflowVisible: true, ...buttonGroupPlaygroundSections.dropdown },
        { id: 'popover', overflowVisible: true, ...buttonGroupPlaygroundSections.popover },
    ],
};

export const buttonGroupSectionIds = buttonGroupPlaygroundSpec.sections.map((section) => section.id);
