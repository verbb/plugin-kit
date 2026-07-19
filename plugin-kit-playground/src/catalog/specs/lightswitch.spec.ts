import { lightswitchPlaygroundComparison } from '../data/comparison.js';
import { lightswitchPlaygroundMeta, lightswitchPlaygroundSections } from '../data/meta-lightswitch.js';
import type { PlaygroundSpec } from '../types.js';

export type LightswitchSectionId =
    | keyof typeof lightswitchPlaygroundComparison
    | keyof typeof lightswitchPlaygroundSections;

/** Single source of truth for Lightswitch playground section order and copy. */
export const lightswitchPlaygroundSpec: PlaygroundSpec = {
    meta: lightswitchPlaygroundMeta,
    sections: [
        { id: 'craftComparison', bare: true, ...lightswitchPlaygroundComparison.craftComparison },
        { id: 'basicUsage', ...lightswitchPlaygroundSections.basicUsage },
        { id: 'sizes', ...lightswitchPlaygroundSections.sizes },
        { id: 'checked', ...lightswitchPlaygroundSections.checked },
        { id: 'disabled', ...lightswitchPlaygroundSections.disabled },
        { id: 'labels', ...lightswitchPlaygroundSections.labels },
    ],
};

export const lightswitchSectionIds = lightswitchPlaygroundSpec.sections.map((section) => section.id);
