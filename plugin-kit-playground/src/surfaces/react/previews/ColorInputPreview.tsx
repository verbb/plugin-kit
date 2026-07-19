import { colorInputPlaygroundMeta, colorInputPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { colorInputReactSectionRenderers } from '../color-input-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function ColorInputPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={colorInputPlaygroundSpec}
            sectionRenderers={colorInputReactSectionRenderers}
        />
    );
}

export const colorInputPreview: SurfacePreviewDefinition = {
    id: 'color-input',
    title: colorInputPlaygroundMeta.title,
    description: colorInputPlaygroundMeta.description,
    Component: ColorInputPreviewPage,
};
