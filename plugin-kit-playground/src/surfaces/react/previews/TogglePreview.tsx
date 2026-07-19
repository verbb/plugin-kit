import { togglePlaygroundMeta, togglePlaygroundSpec } from '@verbb/plugin-kit-playground';

import { toggleReactSectionRenderers } from '../toggle-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function TogglePreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={togglePlaygroundSpec}
            sectionRenderers={toggleReactSectionRenderers}
        />
    );
}

export const togglePreview: SurfacePreviewDefinition = {
    id: 'toggle',
    title: togglePlaygroundMeta.title,
    description: togglePlaygroundMeta.description,
    Component: TogglePreviewPage,
};
