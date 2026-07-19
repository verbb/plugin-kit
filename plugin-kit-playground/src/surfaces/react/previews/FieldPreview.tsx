import { fieldPlaygroundMeta, fieldPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { fieldReactSectionRenderers } from '../field-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function FieldPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={fieldPlaygroundSpec}
            sectionRenderers={fieldReactSectionRenderers}
        />
    );
}

export const fieldPreview: SurfacePreviewDefinition = {
    id: 'field',
    title: fieldPlaygroundMeta.title,
    description: fieldPlaygroundMeta.description,
    Component: FieldPreviewPage,
};
