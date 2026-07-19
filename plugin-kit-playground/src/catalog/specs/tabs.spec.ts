import { tabsPlaygroundMeta, tabsPlaygroundSections } from '../data/meta-tabs.js';
import type { PlaygroundSpec } from '../types.js';

export type TabsSectionId = keyof typeof tabsPlaygroundSections;

/** Single source of truth for Tabs playground section order and copy. */
export const tabsPlaygroundSpec: PlaygroundSpec = {
    meta: tabsPlaygroundMeta,
    sections: [
        { id: 'basic', ...tabsPlaygroundSections.basic },
        { id: 'pane', ...tabsPlaygroundSections.pane },
        { id: 'modal', ...tabsPlaygroundSections.modal },
        { id: 'sidebar', ...tabsPlaygroundSections.sidebar },
        { id: 'overflow', ...tabsPlaygroundSections.overflow },
    ],
};

export const tabsSectionIds = tabsPlaygroundSpec.sections.map((section) => section.id);
