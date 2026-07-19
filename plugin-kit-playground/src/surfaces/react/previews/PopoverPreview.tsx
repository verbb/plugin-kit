import { popoverPlaygroundMeta, popoverPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { popoverReactSectionRenderers } from '../popover-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function PopoverPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={popoverPlaygroundSpec}
            sectionRenderers={popoverReactSectionRenderers}
        />
    );
}

export const popoverPreview: SurfacePreviewDefinition = {
    id: 'popover',
    title: popoverPlaygroundMeta.title,
    description: popoverPlaygroundMeta.description,
    Component: PopoverPreviewPage,
};
