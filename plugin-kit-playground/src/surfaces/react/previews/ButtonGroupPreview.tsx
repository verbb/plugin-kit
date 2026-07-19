import { buttonGroupPlaygroundMeta, buttonGroupPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import { buttonGroupReactSectionRenderers } from '../button-group-sections.js';
import type { SurfacePreviewDefinition } from '../types.js';

function ButtonGroupPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={buttonGroupPlaygroundSpec}
            sectionRenderers={buttonGroupReactSectionRenderers}
        />
    );
}

export const buttonGroupPreview: SurfacePreviewDefinition = {
    id: 'button-group',
    title: buttonGroupPlaygroundMeta.title,
    description: buttonGroupPlaygroundMeta.description,
    Component: ButtonGroupPreviewPage,
};
