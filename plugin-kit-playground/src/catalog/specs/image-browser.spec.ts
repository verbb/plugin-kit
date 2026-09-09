import { imageBrowserPlaygroundMeta, imageBrowserPlaygroundSections } from '../data/meta-image-browser.js';
import type { PlaygroundSpec } from '../types.js';

export type ImageBrowserSectionId = keyof typeof imageBrowserPlaygroundSections;

/** Single source of truth for Image Browser playground section order and copy. */
export const imageBrowserPlaygroundSpec: PlaygroundSpec = {
    meta: imageBrowserPlaygroundMeta,
    sections: [
        { id: 'icons', ...imageBrowserPlaygroundSections.icons },
        { id: 'images', ...imageBrowserPlaygroundSections.images },
        { id: 'groups', ...imageBrowserPlaygroundSections.groups },
        { id: 'states', ...imageBrowserPlaygroundSections.states },
    ],
};

export const imageBrowserSectionIds = imageBrowserPlaygroundSpec.sections.map((section) => section.id);
