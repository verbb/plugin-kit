import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

/** Web component previews — one function per section id from scrollAreaPlaygroundSpec. */
export const scrollAreaWebSectionRenderers: PlaygroundSectionRendererMap = {
    basic(preview) {
        const scrollArea = document.createElement('pk-scroll-area');
        scrollArea.style.height = '12rem';
        scrollArea.style.width = '100%';
        scrollArea.style.maxWidth = '24rem';

        const content = document.createElement('div');
        content.style.padding = '0.75rem';
        content.innerHTML = Array.from({ length: 20 }, (_, index) => {
            return `<p style="margin: 0 0 0.75rem; font-size: 14px; color: var(--pk-color-gray-600);">Scrollable row ${index + 1} — long content inside a constrained scroll region.</p>`;
        }).join('');

        scrollArea.append(content);
        preview.append(scrollArea);
    },
};
