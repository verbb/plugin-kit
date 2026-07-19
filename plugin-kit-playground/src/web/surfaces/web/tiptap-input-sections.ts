import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

/** Web component previews — one function per section id from tiptapInputPlaygroundSpec. */
export const tiptapInputWebSectionRenderers: PlaygroundSectionRendererMap = {
    basicUsage(preview) {
        const input = document.createElement('pk-tiptap-input');
        input.setAttribute('value', 'Hello {field:total}');
        input.style.maxWidth = '32rem';

        const output = document.createElement('pre');
        output.className = 'pg-code-block';
        output.textContent = 'Hello {field:total}';

        input.addEventListener('pk-change', (event) => {
            output.textContent = (event as CustomEvent<{ value: string }>).detail.value;
        });

        preview.append(input, output);
    },
};
