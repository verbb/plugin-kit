import { dialogPlaygroundMeta, dialogPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { dialogReactSectionRenderers } from '../dialog-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function DialogPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={dialogPlaygroundSpec}
            sectionRenderers={dialogReactSectionRenderers}
        />
    );
}

export const dialogPreview: SurfacePreviewDefinition = {
    id: 'dialog',
    title: dialogPlaygroundMeta.title,
    description: dialogPlaygroundMeta.description,
    Component: DialogPreviewPage,
};
