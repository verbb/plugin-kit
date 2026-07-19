import { toggleGroupPlaygroundMeta, toggleGroupPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { toggleGroupReactSectionRenderers } from '../toggle-group-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function ToggleGroupPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={toggleGroupPlaygroundSpec}
            sectionRenderers={toggleGroupReactSectionRenderers}
        />
    );
}

export const toggleGroupPreview: SurfacePreviewDefinition = {
    id: 'toggle-group',
    title: toggleGroupPlaygroundMeta.title,
    description: toggleGroupPlaygroundMeta.description,
    Component: ToggleGroupPreviewPage,
};
