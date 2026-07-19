import { scrollAreaPlaygroundMeta, scrollAreaPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { scrollAreaReactSectionRenderers } from '../scroll-area-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function ScrollAreaPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={scrollAreaPlaygroundSpec}
            sectionRenderers={scrollAreaReactSectionRenderers}
        />
    );
}

export const scrollAreaPreview: SurfacePreviewDefinition = {
    id: 'scroll-area',
    title: scrollAreaPlaygroundMeta.title,
    description: scrollAreaPlaygroundMeta.description,
    Component: ScrollAreaPreviewPage,
};
