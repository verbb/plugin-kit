import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';
import { tiptapContentSampleValue } from '../../tiptap-content.js';

/** Web component previews — one function per section id from tiptapContentPlaygroundSpec. */
export const tiptapContentWebSectionRenderers: PlaygroundSectionRendererMap = {
    basicUsage(preview) {
        const content = document.createElement('pk-tiptap-content');
        content.setAttribute('value', tiptapContentSampleValue);
        content.style.maxWidth = '32rem';
        preview.append(content);
    },
};
