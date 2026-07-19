import { statusPlaygroundMeta, statusPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { statusReactSectionRenderers } from '../status-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function StatusPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={statusPlaygroundSpec}
            sectionRenderers={statusReactSectionRenderers}
        />
    );
}

export const statusPreview: SurfacePreviewDefinition = {
    id: 'status',
    title: statusPlaygroundMeta.title,
    description: statusPlaygroundMeta.description,
    Component: StatusPreviewPage,
};
