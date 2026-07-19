import { spinnerPlaygroundMeta, spinnerPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { spinnerReactSectionRenderers } from '../spinner-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function SpinnerPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={spinnerPlaygroundSpec}
            sectionRenderers={spinnerReactSectionRenderers}
        />
    );
}

export const spinnerPreview: SurfacePreviewDefinition = {
    id: 'spinner',
    title: spinnerPlaygroundMeta.title,
    description: spinnerPlaygroundMeta.description,
    Component: SpinnerPreviewPage,
};
