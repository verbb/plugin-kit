import { selectPlaygroundMeta, selectPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { selectReactSectionRenderers } from '../select-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function SelectPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={selectPlaygroundSpec}
            sectionRenderers={selectReactSectionRenderers}
        />
    );
}

export const selectPreview: SurfacePreviewDefinition = {
    id: 'select',
    title: selectPlaygroundMeta.title,
    description: selectPlaygroundMeta.description,
    Component: SelectPreviewPage,
};
