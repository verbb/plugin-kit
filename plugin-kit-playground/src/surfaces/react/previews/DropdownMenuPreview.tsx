import { dropdownMenuPlaygroundMeta, dropdownMenuPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { dropdownMenuReactSectionRenderers } from '../dropdown-menu-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function DropdownMenuPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={dropdownMenuPlaygroundSpec}
            sectionRenderers={dropdownMenuReactSectionRenderers}
        />
    );
}

export const dropdownMenuPreview: SurfacePreviewDefinition = {
    id: 'dropdown-menu',
    title: dropdownMenuPlaygroundMeta.title,
    description: dropdownMenuPlaygroundMeta.description,
    Component: DropdownMenuPreviewPage,
};
