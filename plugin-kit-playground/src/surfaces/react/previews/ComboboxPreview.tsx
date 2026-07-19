import { comboboxPlaygroundMeta, comboboxPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { comboboxReactSectionRenderers } from '../combobox-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function ComboboxPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={comboboxPlaygroundSpec}
            sectionRenderers={comboboxReactSectionRenderers}
        />
    );
}

export const comboboxPreview: SurfacePreviewDefinition = {
    id: 'combobox',
    title: comboboxPlaygroundMeta.title,
    description: comboboxPlaygroundMeta.description,
    Component: ComboboxPreviewPage,
};
