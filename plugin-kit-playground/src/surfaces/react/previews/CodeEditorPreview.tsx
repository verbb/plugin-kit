import { codeEditorPlaygroundMeta, codeEditorPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { codeEditorReactSectionRenderers } from '../code-editor-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function CodeEditorPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={codeEditorPlaygroundSpec}
            sectionRenderers={codeEditorReactSectionRenderers}
        />
    );
}

export const codeEditorPreview: SurfacePreviewDefinition = {
    id: 'code-editor',
    title: codeEditorPlaygroundMeta.title,
    description: codeEditorPlaygroundMeta.description,
    Component: CodeEditorPreviewPage,
};
