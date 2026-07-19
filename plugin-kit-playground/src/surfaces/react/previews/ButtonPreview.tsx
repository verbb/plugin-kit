import { buttonPlaygroundMeta, buttonPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import { buttonReactSectionRenderers } from '../button-sections.js';
import type { SurfacePreviewDefinition } from '../types.js';

function ButtonPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={buttonPlaygroundSpec}
            sectionRenderers={buttonReactSectionRenderers}
        />
    );
}

export const buttonPreview: SurfacePreviewDefinition = {
    id: 'button',
    title: buttonPlaygroundMeta.title,
    description: buttonPlaygroundMeta.description,
    Component: ButtonPreviewPage,
};
