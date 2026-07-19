import { iconPlaygroundMeta, iconPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { iconReactSectionRenderers } from '../icon-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function IconPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={iconPlaygroundSpec}
            sectionRenderers={iconReactSectionRenderers}
        />
    );
}

export const iconPreview: SurfacePreviewDefinition = {
    id: 'icon',
    title: iconPlaygroundMeta.title,
    description: iconPlaygroundMeta.description,
    Component: IconPreviewPage,
};
