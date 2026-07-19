import { tiptapInputPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { tiptapInputReactSectionRenderers } from '../tiptap-input-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function TiptapInputPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={tiptapInputPlaygroundSpec}
            sectionRenderers={tiptapInputReactSectionRenderers}
        />
    );
}

export const tiptapInputPreview: SurfacePreviewDefinition = {
    id: 'tiptap-input',
    title: tiptapInputPlaygroundSpec.meta.title,
    description: tiptapInputPlaygroundSpec.meta.description,
    Component: TiptapInputPreviewPage,
};
