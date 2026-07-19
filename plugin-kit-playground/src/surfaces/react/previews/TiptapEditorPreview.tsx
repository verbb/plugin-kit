import { tiptapEditorPlaygroundMeta, tiptapEditorPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { tiptapEditorReactSectionRenderers } from '../tiptap-editor-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function TiptapEditorPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={tiptapEditorPlaygroundSpec}
            sectionRenderers={tiptapEditorReactSectionRenderers}
        />
    );
}

export const tiptapEditorPreview: SurfacePreviewDefinition = {
    id: 'tiptap-editor',
    title: tiptapEditorPlaygroundMeta.title,
    description: tiptapEditorPlaygroundMeta.description,
    Component: TiptapEditorPreviewPage,
};
