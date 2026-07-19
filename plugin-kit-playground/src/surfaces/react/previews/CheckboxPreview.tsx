import { checkboxPlaygroundMeta, checkboxPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { checkboxReactSectionRenderers } from '../checkbox-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function CheckboxPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={checkboxPlaygroundSpec}
            sectionRenderers={checkboxReactSectionRenderers}
        />
    );
}

export const checkboxPreview: SurfacePreviewDefinition = {
    id: 'checkbox',
    title: checkboxPlaygroundMeta.title,
    description: checkboxPlaygroundMeta.description,
    Component: CheckboxPreviewPage,
};
