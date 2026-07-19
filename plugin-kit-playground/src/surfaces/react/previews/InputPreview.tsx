import { inputPlaygroundMeta, inputPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { inputReactSectionRenderers } from '../input-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function InputPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={inputPlaygroundSpec}
            sectionRenderers={inputReactSectionRenderers}
        />
    );
}

export const inputPreview: SurfacePreviewDefinition = {
    id: 'input',
    title: inputPlaygroundMeta.title,
    description: inputPlaygroundMeta.description,
    Component: InputPreviewPage,
};
