import { textareaPlaygroundMeta, textareaPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { textareaReactSectionRenderers } from '../textarea-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function TextareaPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={textareaPlaygroundSpec}
            sectionRenderers={textareaReactSectionRenderers}
        />
    );
}

export const textareaPreview: SurfacePreviewDefinition = {
    id: 'textarea',
    title: textareaPlaygroundMeta.title,
    description: textareaPlaygroundMeta.description,
    Component: TextareaPreviewPage,
};
