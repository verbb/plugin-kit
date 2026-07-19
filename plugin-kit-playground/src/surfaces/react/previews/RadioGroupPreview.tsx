import { radioGroupPlaygroundMeta, radioGroupPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { radioGroupReactSectionRenderers } from '../radio-group-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function RadioGroupPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={radioGroupPlaygroundSpec}
            sectionRenderers={radioGroupReactSectionRenderers}
        />
    );
}

export const radioGroupPreview: SurfacePreviewDefinition = {
    id: 'radio-group',
    title: radioGroupPlaygroundMeta.title,
    description: radioGroupPlaygroundMeta.description,
    Component: RadioGroupPreviewPage,
};
