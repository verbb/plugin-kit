import { separatorPlaygroundMeta, separatorPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { separatorReactSectionRenderers } from '../separator-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function SeparatorPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={separatorPlaygroundSpec}
            sectionRenderers={separatorReactSectionRenderers}
        />
    );
}

export const separatorPreview: SurfacePreviewDefinition = {
    id: 'separator',
    title: separatorPlaygroundMeta.title,
    description: separatorPlaygroundMeta.description,
    Component: SeparatorPreviewPage,
};
