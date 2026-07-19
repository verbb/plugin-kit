import { tooltipPlaygroundMeta, tooltipPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { tooltipReactSectionRenderers } from '../tooltip-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function TooltipPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={tooltipPlaygroundSpec}
            sectionRenderers={tooltipReactSectionRenderers}
        />
    );
}

export const tooltipPreview: SurfacePreviewDefinition = {
    id: 'tooltip',
    title: tooltipPlaygroundMeta.title,
    description: tooltipPlaygroundMeta.description,
    Component: TooltipPreviewPage,
};
