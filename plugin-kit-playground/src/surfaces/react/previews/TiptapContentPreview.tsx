import { tiptapContentPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { tiptapContentReactSectionRenderers } from '../tiptap-content-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function TiptapContentPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={tiptapContentPlaygroundSpec}
            sectionRenderers={tiptapContentReactSectionRenderers}
        />
    );
}

export const tiptapContentPreview: SurfacePreviewDefinition = {
    id: 'tiptap-content',
    title: tiptapContentPlaygroundSpec.meta.title,
    description: tiptapContentPlaygroundSpec.meta.description,
    Component: TiptapContentPreviewPage,
};
