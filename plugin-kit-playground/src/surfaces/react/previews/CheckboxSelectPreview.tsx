import { checkboxSelectPlaygroundMeta, checkboxSelectPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { checkboxSelectReactSectionRenderers } from '../checkbox-select-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function CheckboxSelectPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={checkboxSelectPlaygroundSpec}
            sectionRenderers={checkboxSelectReactSectionRenderers}
        />
    );
}

export const checkboxSelectPreview: SurfacePreviewDefinition = {
    id: 'checkbox-select',
    title: checkboxSelectPlaygroundMeta.title,
    description: checkboxSelectPlaygroundMeta.description,
    Component: CheckboxSelectPreviewPage,
};
