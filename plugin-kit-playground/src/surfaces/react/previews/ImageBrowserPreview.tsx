import { imageBrowserPlaygroundMeta, imageBrowserPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { imageBrowserReactSectionRenderers } from '../image-browser-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function ImageBrowserPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={imageBrowserPlaygroundSpec}
            sectionRenderers={imageBrowserReactSectionRenderers}
        />
    );
}

export const imageBrowserPreview: SurfacePreviewDefinition = {
    id: 'image-browser',
    title: imageBrowserPlaygroundMeta.title,
    description: imageBrowserPlaygroundMeta.description,
    Component: ImageBrowserPreviewPage,
};
