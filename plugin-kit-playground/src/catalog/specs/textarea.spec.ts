import { textareaPlaygroundComparison } from '../data/comparison.js';
import { textareaPlaygroundMeta, textareaPlaygroundSections } from '../data/meta-textarea.js';
import type { PlaygroundSpec } from '../types.js';

export type TextareaSectionId =
    | keyof typeof textareaPlaygroundComparison
    | keyof typeof textareaPlaygroundSections;

/** Single source of truth for Textarea playground section order and copy. */
export const textareaPlaygroundSpec: PlaygroundSpec = {
    meta: textareaPlaygroundMeta,
    sections: [
        { id: 'craftComparison', bare: true, ...textareaPlaygroundComparison.craftComparison },
        { id: 'basicUsage', ...textareaPlaygroundSections.basicUsage },
        { id: 'sizes', ...textareaPlaygroundSections.sizes },
        { id: 'widths', ...textareaPlaygroundSections.widths },
        { id: 'validation', ...textareaPlaygroundSections.validation },
        { id: 'disabled', ...textareaPlaygroundSections.disabled },
        { id: 'resize', ...textareaPlaygroundSections.resize },
        { id: 'characterCount', ...textareaPlaygroundSections.characterCount },
        { id: 'inputGroup', ...textareaPlaygroundSections.inputGroup },
    ],
};

export const textareaSectionIds = textareaPlaygroundSpec.sections.map((section) => section.id);
