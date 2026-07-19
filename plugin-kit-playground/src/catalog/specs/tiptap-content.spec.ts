import {
    tiptapContentPlaygroundMeta,
    tiptapContentPlaygroundSections,
    tiptapContentPlaygroundSpec,
    tiptapContentSampleValue,
} from '../../web/tiptap-content.js';

export type TiptapContentSectionId = keyof typeof tiptapContentPlaygroundSections;

export { tiptapContentPlaygroundMeta, tiptapContentPlaygroundSpec, tiptapContentSampleValue };

export const tiptapContentSectionIds = tiptapContentPlaygroundSpec.sections.map((section) => section.id);
